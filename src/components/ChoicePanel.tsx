"use client";

import { useState } from "react";

interface ChoicePanelProps {
  choices: string[];
  setChoices: (choices: string[]) => void;
}

export default function ChoicePanel({ choices, setChoices }: ChoicePanelProps) {
  const [newChoice, setNewChoice] = useState("");

  const addChoice = () => {
    const trimmed = newChoice.trim();
    if (trimmed) {
      setChoices([...choices, trimmed]);
      setNewChoice("");
    }
  };

  const removeChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addChoice();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold">Your Choices</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a choice..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={addChoice}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {choices.map((choice, i) => (
          <li
            key={i}
            className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded-lg"
          >
            <span>{choice}</span>
            <button
              onClick={() => removeChoice(i)}
              className="text-red-400 hover:text-red-300 font-bold text-lg"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {choices.length === 0 && (
        <p className="text-gray-400 text-center">
          Add at least 2 choices to spin the wheel!
        </p>
      )}
    </div>
  );
}
