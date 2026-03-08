"use client";

import { useRef, useState, useEffect } from "react";

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF6384",
  "#C9CBCF",
  "#7BC8A4",
  "#E7E9ED",
];

interface WheelProps {
  choices: string[];
}

export default function Wheel({ choices }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const animationRef = useRef<number>(0);
  const velocityRef = useRef(0);

  const size = 500;
  const center = size / 2;
  const radius = center - 10;

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    if (choices.length === 0) {
      ctx.fillStyle = "#444";
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "20px sans-serif";
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
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      const textX = radius * 0.6;
      ctx.strokeText(choice.length > 12 ? choice.slice(0, 12) + "…" : choice, textX, 5);
      ctx.fillText(choice.length > 12 ? choice.slice(0, 12) + "…" : choice, textX, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(center, center, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [choices, rotation]);

  const spin = () => {
    if (spinning || choices.length < 2) return;
    setSpinning(true);
    setWinner(null);

    // Random velocity between 20 and 40
    velocityRef.current = 20 + Math.random() * 20;

    const animate = () => {
      velocityRef.current *= 0.985; // friction
      setRotation((prev) => prev + velocityRef.current * 0.01);

      if (velocityRef.current > 0.2) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        // Figure out winner: the slice at the top (angle 270° or -π/2)
        setRotation((prev) => {
          const sliceAngle = (Math.PI * 2) / choices.length;
          // Pointer is at the top: -π/2 (or 3π/2)
          const pointerAngle = -Math.PI / 2;
          const normalizedRotation = ((pointerAngle - prev) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          const winnerIndex = Math.floor(normalizedRotation / sliceAngle) % choices.length;
          setWinner(choices[winnerIndex]);
          return prev;
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Pointer triangle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "15px solid transparent",
              borderRight: "15px solid transparent",
              borderTop: "30px solid #fff",
            }}
          />
        </div>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-full"
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning || choices.length < 2}
        className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-bold text-xl rounded-full transition-colors"
      >
        {spinning ? "Spinning..." : "SPIN!"}
      </button>

      {winner && (
        <div className="text-2xl font-bold text-yellow-400 animate-bounce">
          {winner}!
        </div>
      )}
    </div>
  );
}
