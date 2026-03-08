"use client";

import { useState } from "react";

const PRESETS: Record<string, string[]> = {
  "Food": ["Pizza", "Tacos", "Burgers", "Sushi", "Pasta", "Salad"],
  "Hobbies": ["Drawing", "Reading", "Gaming", "Cycling", "Cooking", "Dancing"],
  "Travel": ["Japan", "Italy", "Brazil", "Iceland", "Australia", "Mexico"],
  "Board Games": ["Monopoly", "Chess", "Uno", "Jenga", "Clue", "Sorry!"],
  "Movies": ["Action", "Comedy", "Animated", "Sci-Fi", "Adventure", "Horror"],
  "Sports": ["Soccer", "Basketball", "Swimming", "Tennis", "Skateboarding", "Baseball"],
  "Animals": ["Lion", "Elephant", "Dolphin", "Eagle", "Panda", "Tiger"],
  "Superpowers": ["Flying", "Invisibility", "Super Speed", "Teleportation", "Super Strength", "Time Travel"],
};

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

  const loadPreset = (topic: string) => {
    setChoices(PRESETS[topic]);
  };

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{
        background: "rgba(20, 60, 20, 0.85)",
        border: "3px solid #8B4513",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <h2
        className="text-2xl font-bold"
        style={{ color: "#FFD700", textShadow: "1px 1px 0 #2d5a1e" }}
      >
        Your Choices
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a choice..."
          className="flex-1 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "2px solid #6a994e",
            color: "#fff",
          }}
        />
        <button
          onClick={addChoice}
          className="px-4 py-2 rounded-lg font-bold transition-all active:scale-95"
          style={{
            background: "linear-gradient(180deg, #6a994e 0%, #386641 100%)",
            border: "2px solid #2d5a1e",
            color: "#fff",
          }}
        >
          Add
        </button>
      </div>

      {/* Choices list */}
      {choices.length > 0 && (
        <ul className="space-y-2 max-h-48 overflow-y-auto">
          {choices.map((choice, i) => (
            <li
              key={i}
              className="flex items-center justify-between px-4 py-2 rounded-lg"
              style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(106,153,78,0.4)",
              }}
            >
              <span>{choice}</span>
              <button
                onClick={() => removeChoice(i)}
                className="text-red-400 hover:text-red-300 font-bold text-lg ml-2"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Quick presets */}
      <div>
        <p
          className="text-sm mb-2"
          style={{ color: "#a3b18a" }}
        >
          Or pick a topic:
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRESETS).map((topic) => (
            <button
              key={topic}
              onClick={() => loadPreset(topic)}
              className="px-3 py-1.5 rounded-full text-sm font-bold transition-all active:scale-95 hover:brightness-110"
              style={{
                background: "rgba(255,215,0,0.15)",
                border: "2px solid rgba(255,215,0,0.4)",
                color: "#FFD700",
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {choices.length === 0 && (
        <p style={{ color: "#a3b18a" }} className="text-center text-sm">
          Add your own choices or pick a topic above!
        </p>
      )}
    </div>
  );
}
