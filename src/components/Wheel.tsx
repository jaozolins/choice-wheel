"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// Jungle-themed colors: rich greens, earthy browns, tropical accents
const COLORS = [
  "#2D6A4F", // deep jungle green
  "#D4A373", // warm sandy brown
  "#40916C", // emerald green
  "#BC6C25", // rich bark brown
  "#52B788", // bright tropical green
  "#DDA15E", // golden amber
  "#1B4332", // dark forest green
  "#E9C46A", // tropical yellow
  "#74C69D", // light jungle green
  "#606C38", // olive green
  "#A7C957", // lime leaf
  "#8B4513", // saddle brown
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
  const outerRing = 18;
  const radius = center - outerRing - 4;

  // Responsive sizing — fit both width and height
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const vh = window.innerHeight;
        // Reserve space for title + button + padding
        const availableHeight = vh - 200;
        const maxByWidth = containerWidth - 20;
        const maxSize = Math.min(maxByWidth, availableHeight, 700);
        setDisplaySize(Math.max(250, maxSize));
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

    // Outer wooden ring
    ctx.beginPath();
    ctx.arc(center, center, center - 2, 0, Math.PI * 2);
    const woodGrad = ctx.createRadialGradient(center, center, radius, center, center, center);
    woodGrad.addColorStop(0, "#8B5E3C");
    woodGrad.addColorStop(0.4, "#6B3A2A");
    woodGrad.addColorStop(0.7, "#8B5E3C");
    woodGrad.addColorStop(1, "#5C3317");
    ctx.fillStyle = woodGrad;
    ctx.fill();
    ctx.strokeStyle = "#3E1F0D";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner ring highlight
    ctx.beginPath();
    ctx.arc(center, center, radius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,215,0,0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (choices.length === 0) {
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#1B4332";
      ctx.fill();
      ctx.fillStyle = "#FFD700";
      ctx.font = "800 28px Nunito, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Add choices!", center, center);
      return;
    }

    const sliceAngle = (Math.PI * 2) / choices.length;

    choices.forEach((choice, i) => {
      const startAngle = rotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Draw slice with gradient
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();

      const baseColor = COLORS[i % COLORS.length];
      ctx.fillStyle = baseColor;
      ctx.fill();

      // Slice border
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Lighter inner edge for depth
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.font = "800 20px Nunito, sans-serif";
      ctx.textAlign = "center";
      const textX = radius * 0.6;
      const label = choice.length > 14 ? choice.slice(0, 14) + "..." : choice;

      // Text shadow for readability
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillText(label, textX + 1, 8);
      // Main text
      ctx.fillStyle = "#fff";
      ctx.fillText(label, textX, 7);
      ctx.restore();
    });

    // Decorative ring between slices and center
    ctx.beginPath();
    ctx.arc(center, center, 42, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,215,0,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center hub - wooden look
    ctx.beginPath();
    ctx.arc(center, center, 32, 0, Math.PI * 2);
    const hubGrad = ctx.createRadialGradient(center - 5, center - 5, 2, center, center, 32);
    hubGrad.addColorStop(0, "#FFE066");
    hubGrad.addColorStop(0.5, "#FFD700");
    hubGrad.addColorStop(1, "#B8860B");
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.strokeStyle = "#8B6914";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#5C3317";
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
        {/* Pointer triangle - leaf-shaped */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "18px solid transparent",
              borderRight: "18px solid transparent",
              borderTop: "40px solid #FFD700",
              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
            }}
          />
        </div>
        <canvas
          ref={canvasRef}
          width={internalSize}
          height={internalSize}
          style={{
            width: displaySize,
            height: displaySize,
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning || choices.length < 2}
        className="px-10 py-4 disabled:opacity-40 text-2xl rounded-full transition-all active:scale-95"
        style={{
          background: "linear-gradient(180deg, #FFD700 0%, #B8860B 100%)",
          color: "#3d2000",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
          border: "3px solid #5C3317",
          fontWeight: 800,
        }}
      >
        {spinning ? "Spinning..." : "SPIN!"}
      </button>
    </div>
  );
}
