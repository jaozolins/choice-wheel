"use client";

import { useState } from "react";
import Wheel from "@/components/Wheel";
import ChoicePanel from "@/components/ChoicePanel";
import WinnerPopup from "@/components/WinnerPopup";

export default function Home() {
  const [choices, setChoices] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-6 gap-6 lg:gap-10">
      <h1
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-center drop-shadow-lg"
        style={{
          color: "#FFD700",
          textShadow: "2px 2px 0 #2d5a1e, 4px 4px 8px rgba(0,0,0,0.7)",
        }}
      >
        Choice Wheel
      </h1>

      {/* Desktop: side by side, panel vertically centered. Mobile/tablet: stacked */}
      <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-10 w-full max-w-7xl">
        <div className="w-full lg:w-80 shrink-0 order-1 lg:order-none">
          <ChoicePanel choices={choices} setChoices={setChoices} />
        </div>

        <div className="flex-1 flex justify-center w-full order-0 lg:order-none">
          <Wheel choices={choices} onWinner={setWinner} />
        </div>
      </div>

      {winner && (
        <WinnerPopup winner={winner} onClose={() => setWinner(null)} />
      )}
    </main>
  );
}
