"use client";

import { useState } from "react";
import Wheel from "@/components/Wheel";
import ChoicePanel from "@/components/ChoicePanel";
import WinnerPopup from "@/components/WinnerPopup";

export default function Home() {
  const [choices, setChoices] = useState<string[]>([
    "Pizza",
    "Tacos",
    "Burgers",
    "Sushi",
  ]);
  const [winner, setWinner] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 gap-10 md:gap-14">
      <h1
        className="text-4xl md:text-6xl font-bold text-center drop-shadow-lg"
        style={{
          color: "#FFD700",
          textShadow: "2px 2px 0 #2d5a1e, 4px 4px 8px rgba(0,0,0,0.7)",
        }}
      >
        Choice Wheel
      </h1>

      {/* Desktop: side by side, panel vertically centered. Mobile: stacked */}
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 w-full max-w-7xl">
        <div className="w-full lg:w-80 shrink-0">
          <ChoicePanel choices={choices} setChoices={setChoices} />
        </div>

        <div className="flex-1 flex justify-center w-full">
          <Wheel choices={choices} onWinner={setWinner} />
        </div>
      </div>

      {winner && (
        <WinnerPopup winner={winner} onClose={() => setWinner(null)} />
      )}
    </main>
  );
}
