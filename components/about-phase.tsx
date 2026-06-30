export default function AboutPhase() {
  return (
    <div className="w-full h-full flex items-center">
      <div
        className="ml-[8vw] max-w-[480px] p-10"
        style={{
          background: "var(--phase-card-bg)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div
          className="text-[11px] tracking-[0.45em] uppercase mb-6"
          style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
        >
          What is BioHacks
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
          <span style={{ color: "#00e5cc" }}>Three tracks.</span>
          <br />
          Unlimited impact.
        </h2>

        <p
          className="font-normal text-base leading-loose"
          style={{ fontFamily: "var(--font-sans)", color: "#e8e4dc" }}
        >
          BioHacks challenges science and engineering students
          to collaborate on a real neurological health case -
          no prior experience required, just curiosity and drive.
        </p>

        <div
          className="mt-8 pt-6 border-t flex flex-wrap gap-x-5 gap-y-2"
          style={{
            borderColor: "rgba(0, 229, 204, 0.25)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#00e5cc",
          }}
        >
          <span>Detection &amp; Diagnostics</span>
          <span>Therapeutics &amp; Delivery</span>
          <span>Wearable Devices &amp; Quality of Life</span>
        </div>
      </div>
    </div>
  );
}
