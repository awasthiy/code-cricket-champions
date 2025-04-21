
import React, { useState, useRef } from "react";
import { mockChallenges } from "@/data/mockData";
import { Button } from "@/components/ui/button";

// Utility to randomize and pick a challenge ID
function getRandomChallenge() {
  const idx = Math.floor(Math.random() * mockChallenges.length);
  return mockChallenges[idx];
}

export default function SpinWheel() {
  // Refs for sound playback
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  // Play spin sound and win sound using refs
  const playSpinSound = () => {
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play();
    }
  };

  const playWinSound = () => {
    if (winSoundRef.current) {
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.play();
    }
  };

  const handleSpin = () => {
    setSpinning(true);
    setSelected(null);
    playSpinSound();
    setTimeout(() => {
      const chosen = getRandomChallenge();
      setSelected(chosen);
      setSpinning(false);
      playWinSound();
    }, 1900); // Slightly longer spin for more suspense
  };

  return (
    <div className="flex flex-col items-center gap-6 my-12">
      {/* Invisible audio elements for sound effects */}
      <audio ref={spinSoundRef} src="/spin-sound.mp3" preload="auto" />
      <audio ref={winSoundRef} src="/win-sound.mp3" preload="auto" />
      <div className="relative w-[340px] h-[340px] flex items-center justify-center">
        {/* WHEEL BACKGROUND */}
        <div
          className={`rounded-full border-[18px] border-cricket-blue bg-gradient-to-br from-cricket-purple to-cricket-gold w-[340px] h-[340px] flex items-center justify-center shadow-2xl transition-all duration-700
            ${spinning ? "animate-spin-super" : "hover:scale-105"} 
          `}
          style={{
            transition: "transform 1.6s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
            boxShadow: "0 8px 40px 0 #6C1BAB40, 0 1.5px 30px #F2C94C50",
          }}
          aria-label={spinning ? "Wheel spinning" : "Spin wheel"}
        >
          <span className="text-center text-2xl md:text-3xl font-extrabold text-cricket-blue px-8 drop-shadow-lg select-none">
            {selected ? selected.title : "🎯"}
          </span>
        </div>
        {/* POINTER */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <div className="w-8 h-8 bg-cricket-gold border-4 border-white rotate-45 shadow-lg animate-bounce" />
        </div>
      </div>
      <Button
        onClick={handleSpin}
        disabled={spinning}
        className="bg-cricket-blue text-white w-52 text-lg py-3 shadow-md hover:scale-105 transition-transform"
      >
        {spinning ? "Spinning..." : "Spin To Pick Challenge"}
      </Button>
      {selected && (
        <div className="mt-3 text-center animate-fade-in">
          <div className="font-extrabold text-2xl text-cricket-purple drop-shadow">{selected.title}</div>
          <div className="text-md text-gray-600 mt-1 max-w-md">{selected.description}</div>
        </div>
      )}
      {/* Custom animation keyframe for extra spinning effect */}
      <style>
        {`
          @keyframes spin-super {
            0% { transform: rotate(0deg);}
            90% { transform: rotate(1280deg);}
            100% { transform: rotate(1360deg);}
          }
          .animate-spin-super {
            animation: spin-super 1.7s cubic-bezier(0.17, 0.67, 0.83, 0.67);
          }
        `}
      </style>
    </div>
  );
}

