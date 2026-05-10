export default function DetailsPhase() {
  return (
    <div className="w-full h-full flex items-center justify-end">
      <div
        className="mr-[8vw] max-w-[400px] w-full p-10"
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
          02 &nbsp;/&nbsp; The Details
        </div>

        <div className="space-y-6">
          <Row label="Where">
            <span
              className="font-bold text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "#e8e4dc" }}
            >
              McMaster University
            </span>
          </Row>

          <Row label="When">
            <span
              className="font-bold text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "#e8e4dc" }}
            >
              Fall 2026
            </span>
          </Row>

          <Row label="The Challenge">
            <p
              className="font-normal text-base leading-relaxed mt-1"
              style={{ fontFamily: "var(--font-sans)", color: "#e8e4dc" }}
            >
              A live neuro health case - revealed at the event.
              Your team diagnoses, engineers, and presents a solution.
            </p>
          </Row>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="text-[10px] tracking-[0.4em] uppercase mb-2"
        style={{ fontFamily: "var(--font-mono)", color: "rgba(200,205,215,0.7)" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
