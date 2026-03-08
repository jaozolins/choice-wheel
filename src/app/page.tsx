"use client";

import { useState } from "react";
import Wheel from "@/components/Wheel";
import ChoicePanel from "@/components/ChoicePanel";

export default function Home() {
  const [choices, setChoices] = useState<string[]>([
    "Pizza",
    "Tacos",
    "Burgers",
    "Sushi",
  ]);

  return (
    <main className="min-h-screen flex flex-col items-center p-6 gap-8">
      <h1 className="text-4xl font-bold text-center">Choice Wheel</h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full max-w-7xl">
        <div className="w-full max-w-md">
          <ChoicePanel choices={choices} setChoices={setChoices} />
        </div>

        <div className="flex-1 flex justify-center">
          <Wheel choices={choices} />
        </div>
      </div>
    </main>
  );
}
