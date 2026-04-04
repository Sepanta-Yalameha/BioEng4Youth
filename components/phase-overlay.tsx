"use client";

interface Props {
  visible: boolean;
  children: React.ReactNode;
}

export default function PhaseOverlay({ visible, children }: Props) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden={!visible}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: visible ? "translateY(0)" : "translateY(14px)",
          transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
