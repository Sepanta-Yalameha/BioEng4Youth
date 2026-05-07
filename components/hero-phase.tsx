export default function HeroPhase() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <div
        className="text-[10px] tracking-[0.5em] uppercase mb-8"
        style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
      >
        BioEng4Youth &nbsp;&mdash;&nbsp; McMaster University
      </div>

      <h1
        className="font-bold leading-none mb-6"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 13vw, 10rem)",
          color: "#e8e4dc",
          letterSpacing: "-0.045em",
        }}
      >
        Bio<span style={{ color: "#00e5cc" }}>Hacks</span>
      </h1>

      <p
        className="font-light text-base max-w-xs mx-auto leading-loose tracking-wide"
        style={{ fontFamily: "var(--font-sans)", color: "rgba(232,228,220,0.7)" }}
      >
        Where science meets engineering.<br />
        One neuro case. Infinite solutions.
      </p>

      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.3 }}
      >
        <div
          className="text-[9px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#e8e4dc" }}
        >
          Scroll
        </div>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
          }}
        />
      </div>
    </div>
  );
}
