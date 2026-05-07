export default function AboutPhase() {
  return (
    <div className="w-full h-full flex items-center">
      <div
        className="ml-[8vw] max-w-[480px] p-10"
        style={{
          background: "rgba(4, 5, 14, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div
          className="text-[11px] tracking-[0.45em] uppercase mb-6"
          style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
        >
          01 &nbsp;/&nbsp; What is BioHacks
        </div>

        <h2
          className="font-bold leading-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            color: "#e8e4dc",
            letterSpacing: "-0.025em",
          }}
        >
          One case.{" "}
          <span style={{ color: "#00e5cc" }}>Two streams.</span>
          <br />
          Unlimited impact.
        </h2>

        <p
          className="font-normal text-base leading-loose"
          style={{ fontFamily: "var(--font-sans)", color: "#e8e4dc" }}
        >
          BioHacks challenges science and engineering students
          to collaborate on a real neurological health case —
          no prior experience required, just curiosity and drive.
        </p>

        <div className="mt-8 w-16 h-px" style={{ background: "#00e5cc" }} />
      </div>
    </div>
  );
}
