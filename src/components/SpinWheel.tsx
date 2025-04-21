
import React, { useState } from "react";
import { mockChallenges } from "@/data/mockData";
import { Button } from "@/components/ui/button";

// Utility to randomize and pick a challenge ID
function getRandomChallenge() {
  const idx = Math.floor(Math.random() * mockChallenges.length);
  return mockChallenges[idx];
}

export default function SpinWheel() {
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleSpin = () => {
    setSpinning(true);
    setSelected(null);
    setTimeout(() => {
      const chosen = getRandomChallenge();
      setSelected(chosen);
      setSpinning(false);
    }, 1400); // Simulate spin
  };

  return (
    <div className="flex flex-col items-center gap-4 my-8">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className={`rounded-full border-8 border-cricket-blue w-48 h-48 flex items-center justify-center 
          ${spinning ? "animate-spin-slow" : ""}`} 
          style={{ transition: "transform 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)" }}
        >
          <span className="text-center text-lg font-bold text-cricket-purple px-4">
            {selected ? selected.title : "?"}
          </span>
        </div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="w-4 h-4 bg-cricket-gold rotate-45"></div>
        </div>
      </div>
      <Button onClick={handleSpin} disabled={spinning} className="bg-cricket-blue text-white w-40">
        {spinning ? "Spinning..." : "Spin to Pick Challenge"}
      </Button>
      {selected && (
        <div className="mt-2 text-center">
          <div className="font-bold text-lg">{selected.title}</div>
          <div className="text-sm text-gray-500">{selected.description}</div>
        </div>
      )}
    </div>
  );
}

// Add to index.css or Tailwind config:
// .animate-spin-slow { animation: spin 1.2s cubic-bezier(.17,.67,.83,.67) 1; }
