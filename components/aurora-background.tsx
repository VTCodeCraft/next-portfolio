"use client";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora-layer aurora-layer-left" />
      <div className="aurora-layer aurora-layer-right" />
      <div className="aurora-layer aurora-layer-center" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_40%),linear-gradient(180deg,rgba(247,247,251,0.12),rgba(247,247,251,0.78)_75%,#f7f7fb)]" />
    </div>
  );
}
