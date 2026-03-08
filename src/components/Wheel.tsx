"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const COLORS = [
  "#E63946", // red
  "#F4A261", // orange
  "#E9C46A", // yellow
  "#2A9D8F", // teal
  "#264653", // dark blue
  "#6A994E", // jungle green
  "#BC6C25", // brown
  "#DDA15E", // tan
  "#606C38", // olive
  "#9B2226", // dark red
];

interface WheelProps {
  choices: string[];
  onWinner: (winner: string) => void;
}

export default function Wheel({ choices, onWinner }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [displaySize, setDisplaySize] = useState(500);
  const animationRef = useRef<number>(0);
  const velocityRef = useRef(0);

  const internalSize = 750;
  const center = internalSize / 2;
  const radius = center - 10;

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // On mobile cap at container width minus padding, on desktop go big
        const maxSize = Math.min(containerWidth - 20, 700);
        setDisplaySize(Math.max(280, maxSize));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, internalSize, internalSize);

    if (choices.length === 0) {
      ctx.fillStyle = "#2d5a1e";
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Add choices!", center, center);
      return;
    }

    const sliceAngle = (Math.PI * 2) / choices.length;

    choices.forEach((choice, i) => {
      const startAngle = rotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.strokeStyle = "rgba(0,0,0,0.6)";
      ctx.lineWidth = 4;
      const textX = radius * 0.6;
      const label = choice.length > 14 ? choice.slice(0, 14) + "..." : choice;
      ctx.strokeText(label, textX, 7);
      ctx.fillText(label, textX, 7);
      ctx.restore();
    });

    // Center circle with jungle feel
    ctx.beginPath();
    ctx.arc(center, center, 28, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner dot
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#8B4513";
    ctx.fill();
  }, [choices, rotation]);

  const spin = useCallback(() => {
    if (spinning || choices.length < 2) return;
    setSpinning(true);

    velocityRef.current = 20 + Math.random() * 20;

    const animate = () => {
      velocityRef.current *= 0.985;
      setRotation((prev) => prev + velocityRef.current * 0.01);

      if (velocityRef.current > 0.2) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setRotation((prev) => {
          const sliceAngle = (Math.PI * 2) / choices.length;
          const pointerAngle = -Math.PI / 2;
          const normalizedRotation =
            ((pointerAngle - prev) % (Math.PI * 2) + Math.PI * 2) %
            (Math.PI * 2);
          const winnerIndex =
            Math.floor(normalizedRotation / sliceAngle) % choices.length;
          onWinner(choices[winnerIndex]);
          return prev;
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [spinning, choices, onWinner]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 w-full">
      <div className="relative" style={{ width: displaySize, height: displaySize }}>
        {/* Pointer triangle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "18px solid transparent",
              borderRight: "18px solid transparent",
              borderTop: "36px solid #FFD700",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          />
        </div>
        <canvas
          ref={canvasRef}
          width={internalSize}
          height={internalSize}
          className="rounded-full"
          style={{
            width: displaySize,
            height: displaySize,
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
          }}
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning || choices.length < 2}
        className="px-10 py-4 disabled:opacity-40 text-2xl rounded-full transition-all active:scale-95"
        style={{
          background: "linear-gradient(180deg, #FFD700 0%, #FFA500 100%)",
          color: "#3d2000",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
          border: "3px solid #8B4513",
        }}
      >
        {spinning ? "Spinning..." : "SPIN!"}
      </button>
    </div>
  );
}
