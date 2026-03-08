"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface WinnerPopupProps {
  winner: string;
  onClose: () => void;
}

export default function WinnerPopup({ winner, onClose }: WinnerPopupProps) {
  useEffect(() => {
    // Fire confetti from both sides
    const end = Date.now() + 2500;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#FFD700", "#FF6384", "#36A2EB", "#6A994E", "#E9C46A"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#FFD700", "#FF6384", "#36A2EB", "#6A994E", "#E9C46A"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Big initial burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: ["#FFD700", "#FF6384", "#36A2EB", "#6A994E", "#E9C46A", "#8B4513"],
    });

    frame();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Popup */}
      <div
        className="relative rounded-3xl p-8 md:p-12 max-w-lg w-full text-center animate-bounce-in"
        style={{
          background: "linear-gradient(180deg, #1a5c1a 0%, #0b3d0b 100%)",
          border: "4px solid #FFD700",
          boxShadow: "0 0 60px rgba(255,215,0,0.3), 0 20px 60px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="text-xl md:text-2xl mb-4"
          style={{ color: "#a3b18a" }}
        >
          The jungle has chosen...
        </p>

        <h2
          className="text-5xl md:text-7xl font-bold mb-6 break-words"
          style={{
            color: "#FFD700",
            textShadow: "2px 2px 0 #8B4513, 0 0 30px rgba(255,215,0,0.4)",
          }}
        >
          {winner}!
        </h2>

        <button
          onClick={onClose}
          className="px-8 py-3 text-xl rounded-full font-bold transition-all active:scale-95"
          style={{
            background: "linear-gradient(180deg, #FFD700 0%, #FFA500 100%)",
            color: "#3d2000",
            border: "3px solid #8B4513",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          Spin Again!
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
