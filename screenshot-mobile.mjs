import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000/sponsors';
const label = process.argv[3] || 'mobile';

const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${n}-${label}.png`))) n++;
const outputPath = path.join(screenshotDir, `screenshot-${n}-${label}.png`);

const browser = await puppeteer.launch({
  executablePath: '/home/sepanta/.cache/puppeteer/chrome-headless-shell/linux-146.0.7680.153/chrome-headless-shell-linux64/chrome-headless-shell',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: 'load', timeout: 30000 });
await new Promise(r => setTimeout(r, 1200));

await page.evaluate(async () => {
  await new Promise((resolve) => {
    const distance = 150;
    const timer = setInterval(() => {
      window.scrollBy(0, distance);
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }
    }, 40);
  });
});
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();
console.log(`Screenshot saved: ${outputPath}`);
