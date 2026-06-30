// Extract the scroll-experience frames straight from the 4K master
// (media-source/new_4k.mp4) into two responsive WebP tiers:
//   public/frames/frame-NNNN.webp      2560x1440  (desktop / retina)
//   public/frames-sm/frame-NNNN.webp   1280x720   (mobile)
//
// Frames come from the true 4K source, so the downscales are clean supersamples
// (no double compression). Uses Chromium via puppeteer to decode the H.264
// video and encode WebP — no ffmpeg/sharp needed. The source video is served by
// a tiny built-in range server (the page and the <video> share an origin, so
// the canvas isn't tainted and toDataURL works), so this script is fully
// self-contained — no dev server required.
//
// Run:  node scripts/extract-frames.mjs [limit]
import puppeteer from "puppeteer";
import http from "http";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "media-source", "new_4k.mp4");
const OUT_DESKTOP = path.join(ROOT, "public", "frames");
const OUT_MOBILE = path.join(ROOT, "public", "frames-sm");
fs.mkdirSync(OUT_DESKTOP, { recursive: true });
fs.mkdirSync(OUT_MOBILE, { recursive: true });

const TOTAL = 145;
const LIMIT = process.argv[2] ? parseInt(process.argv[2], 10) : TOTAL;
const DESKTOP = { w: 2560, h: 1440, q: 0.82 };
const MOBILE = { w: 1280, h: 720, q: 0.84 };

const fileSize = fs.statSync(SOURCE).size;

// Minimal static server: "/" serves a bare page, "/video" serves the mp4 with
// HTTP range support (needed so the <video> element can seek).
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<!doctype html><meta charset=utf-8><title>extract</title>");
    return;
  }
  if (req.url === "/video") {
    const range = req.headers.range;
    if (range) {
      const m = /bytes=(\d+)-(\d*)/.exec(range);
      const start = parseInt(m[1], 10);
      const end = m[2] ? parseInt(m[2], 10) : fileSize - 1;
      res.writeHead(206, {
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Content-Length": end - start + 1,
      });
      fs.createReadStream(SOURCE, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { "Content-Type": "video/mp4", "Accept-Ranges": "bytes", "Content-Length": fileSize });
      fs.createReadStream(SOURCE).pipe(res);
    }
    return;
  }
  res.writeHead(404);
  res.end();
});
await new Promise((r) => server.listen(0, r));
const PORT = server.address().port;
const BASE = `http://localhost:${PORT}`;

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.goto(BASE + "/", { waitUntil: "load", timeout: 60000 });

const meta = await page.evaluate(async (src, dw, dh, mw, mh) => {
  const v = document.createElement("video");
  v.muted = true;
  v.playsInline = true;
  v.src = src;
  await new Promise((res, rej) => {
    v.onloadedmetadata = res;
    v.onerror = () => rej(new Error("video load error"));
  });
  try { await v.play(); v.pause(); } catch {}
  const dc = document.createElement("canvas");
  dc.width = dw; dc.height = dh;
  const mc = document.createElement("canvas");
  mc.width = mw; mc.height = mh;
  const dctx = dc.getContext("2d");
  const mctx = mc.getContext("2d");
  dctx.imageSmoothingEnabled = mctx.imageSmoothingEnabled = true;
  dctx.imageSmoothingQuality = mctx.imageSmoothingQuality = "high";
  window.__grab = async (t, dq, mq) => {
    await new Promise((res) => {
      const onSeek = () => { v.removeEventListener("seeked", onSeek); res(); };
      v.addEventListener("seeked", onSeek);
      v.currentTime = t;
    });
    dctx.drawImage(v, 0, 0, dw, dh);
    mctx.drawImage(v, 0, 0, mw, mh);
    return [dc.toDataURL("image/webp", dq), mc.toDataURL("image/webp", mq)];
  };
  return { duration: v.duration, vw: v.videoWidth, vh: v.videoHeight };
}, "/video", DESKTOP.w, DESKTOP.h, MOBILE.w, MOBILE.h);

console.log("source:", meta.vw + "x" + meta.vh, meta.duration.toFixed(2) + "s");

const dur = meta.duration;
let dTot = 0, mTot = 0;
for (let i = 0; i < LIMIT; i++) {
  const t = Math.min((i / (TOTAL - 1)) * dur, dur - 0.04);
  const [d, m] = await page.evaluate((tt, dq, mq) => window.__grab(tt, dq, mq), t, DESKTOP.q, MOBILE.q);
  if (!d.startsWith("data:image/webp")) throw new Error("not webp at frame " + i);
  const n = String(i + 1).padStart(4, "0");
  const db = Buffer.from(d.split(",")[1], "base64");
  const mb = Buffer.from(m.split(",")[1], "base64");
  fs.writeFileSync(path.join(OUT_DESKTOP, `frame-${n}.webp`), db);
  fs.writeFileSync(path.join(OUT_MOBILE, `frame-${n}.webp`), mb);
  dTot += db.length; mTot += mb.length;
  if (i % 20 === 0 || i === LIMIT - 1) console.log(`extracted ${i + 1}/${LIMIT}`);
}

await browser.close();
server.close();
const MB = (b) => (b / 1048576).toFixed(2) + "MB";
console.log(JSON.stringify({
  frames: LIMIT,
  desktopWebpTotal: MB(dTot), avgDesktopKB: (dTot / LIMIT / 1024).toFixed(1),
  mobileWebpTotal: MB(mTot), avgMobileKB: (mTot / LIMIT / 1024).toFixed(1),
}, null, 2));
