import React, { useState, useRef } from "react";
import { mockChallenges } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Challenge {
  id: number;
  title: string;
  description: string;
  multiplier: number;
  code?: string;
}

// Utility to randomize and pick a challenge ID
function getRandomChallenge(): Challenge {
  const idx = Math.floor(Math.random() * mockChallenges.length);
  return mockChallenges[idx];
}

// Helper to assign Dream11-inspired colors to panels
const panelColors = [
  "from-[#D4145A] to-[#FBB03B]",
  "from-[#662D8C] to-[#ED1E79]",
  "from-[#0099F7] to-[#F11712]",
  "from-[#36D1C4] to-[#004E8F]",
  "from-[#FC5C7D] to-[#6A82FB]",
  "from-[#FFD200] to-[#F7971E]",
  "from-[#076585] to-[#fff]",
  "from-[#355C7D] to-[#C06C84]",
];

export default function SpinWheel() {
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [spinDeg, setSpinDeg] = useState(0);
  const [flash, setFlash] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalChallenge, setModalChallenge] = useState<Challenge | null>(null);

  const handleSegmentClick = (challenge: Challenge) => {
    if (!spinning) {
      setModalChallenge(challenge);
      setShowModal(true);
    }
  };

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
    setFlash(false);
    playSpinSound();

    const chosen = mockChallenges[Math.floor(Math.random() * mockChallenges.length)];
    const segmentAngle = 360 / 11;
    const chosenIndex = mockChallenges.findIndex(c => c.id === chosen.id);
    const extraSpins = Math.floor(Math.random() * 2) + 5;
    const targetAngle = 360 * extraSpins + (360 - (chosenIndex * segmentAngle));
    
    setSpinDeg(targetAngle);

    setTimeout(() => {
      setSelected(chosen);
      setSpinning(false);
      setFlash(true);
      playWinSound();
      setTimeout(() => setFlash(false), 1200);
    }, 1850);
  };

  const renderSegments = () => {
    const segments = [];
    const total = 11;
    const angleStep = 360 / total;

    for (let i = 0; i < total; i++) {
      const startAngle = (i * angleStep);
      const endAngle = startAngle + angleStep;
      const midAngle = startAngle + (angleStep / 2);
      
      // Calculate text position
      const textRadius = 140;
      const textAngle = midAngle * (Math.PI / 180);
      const textX = 210 + textRadius * Math.cos(textAngle - Math.PI/2);
      const textY = 210 + textRadius * Math.sin(textAngle - Math.PI/2);

      segments.push(
        <g key={i} onClick={() => handleSegmentClick(mockChallenges[i % mockChallenges.length])}>
          <path
            d={`M 210 210 
               L ${210 + 190 * Math.cos((startAngle - 90) * Math.PI / 180)} ${210 + 190 * Math.sin((startAngle - 90) * Math.PI / 180)} 
               A 190 190 0 0 1 ${210 + 190 * Math.cos((endAngle - 90) * Math.PI / 180)} ${210 + 190 * Math.sin((endAngle - 90) * Math.PI / 180)} 
               Z`}
            fill={`url(#segment-gradient-${i % 8})`}
            stroke="#FFF"
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
          />
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#FFF"
            fontSize="32"
            fontWeight="bold"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              userSelect: 'none',
              pointerEvents: 'none',
              transform: `rotate(${midAngle}deg)`,
              transformOrigin: `${textX}px ${textY}px`
            }}
          >
            {i + 1}
          </text>
        </g>
      );
    }
    return segments;
  };

  return (
    <div className="flex flex-col items-center gap-8 my-16">
      <audio ref={spinSoundRef} src="/spin-sound.mp3" preload="auto" />
      <audio ref={winSoundRef} src="/win-sound.mp3" preload="auto" />
      
      <div className="relative w-full max-w-[480px] mx-auto">
        <div
          className={`rounded-full bg-black/90 ring-4 ring-cricket-gold drop-shadow-xl mx-auto flex items-center justify-center ${
            spinning ? "spin-rubberband" : "transition-transform duration-500"
          }`}
          style={{
            width: "min(480px, 90vw)",
            height: "min(480px, 90vw)",
            transform: `rotate(${spinDeg}deg)`,
          }}
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 420 420" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {panelColors.map((grad, i) => (
                <linearGradient
                  key={i}
                  id={`segment-gradient-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="95%"
                  y2="95%"
                >
                  {grad.split(" ").map((stop, idx) => (
                    <stop
                      key={stop}
                      offset={idx === 0 ? "0%" : "100%"}
                      stopColor={stop.replace(/from-|\[|\]|to-/g, "").replace("#", "").length === 6 ? "#" + stop.split("#")[1] : stop}
                    />
                  ))}
                </linearGradient>
              ))}
            </defs>
            {renderSegments()}
            <circle cx="210" cy="210" r="4" fill="#FFF" />
          </svg>
          
          {flash && (
            <div className="absolute inset-0 pointer-events-none flash-pop">
              <div className="w-full h-full rounded-full glow-flash" />
            </div>
          )}
        </div>

        <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 64 64" className="rotate-45">
              <circle cx="32" cy="32" r="30" fill="#FFD600" stroke="#FFF" strokeWidth="3" />
              <polygon points="32,12 40,32 24,32" fill="#D4145A" />
              <circle cx="32" cy="32" r="8" fill="#FFF" />
            </svg>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={spinning}
        className="text-lg w-60 py-3 shadow-lg font-extrabold tracking-wider rounded-2xl neon-dream11 hover:scale-105 transition-transform"
      >
        {spinning ? "Spinning..." : "Spin Challenge Wheel"}
      </Button>

      {selected && (
        <div className={`mt-6 text-center transition-all duration-300 ease-out ${flash ? "scale-110" : ""}`}>
          <div className="font-bold text-3xl text-cricket-gold drop-shadow text-gradient-dream11">
            Challenge #{selected.id}
          </div>
          <div className="mt-3 text-lg text-gray-100/80 max-w-md mx-auto dark:text-white/80">
            {selected.description}
          </div>
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cricket-gold">
              Challenge #{modalChallenge?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="text-gray-200">
              {modalChallenge?.description}
            </div>
            {modalChallenge?.code && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {modalChallenge.code}
                </pre>
              </div>
            )}
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setShowModal(false)}
                className="bg-cricket-gold hover:bg-cricket-gold/90"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes spin-rubberband {
          0% { transform: rotate(0deg); }
          80% { transform: rotate(${spinDeg + 8}deg); }
          87% { transform: rotate(${spinDeg - 9}deg); }
          93% { transform: rotate(${spinDeg + 2}deg); }
          100% { transform: rotate(${spinDeg}deg); }
        }
        .spin-rubberband {
          animation: spin-rubberband 1.7s cubic-bezier(0.2,0.7,0.41,1.12);
        }
        .flash-pop {
          animation: dream-flash 1s cubic-bezier(.36,1.35,.38,.98);
        }
        @keyframes dream-flash {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        .glow-flash {
          background: radial-gradient(circle, rgba(255,214,0,0.4) 0%, rgba(255,214,0,0) 70%);
        }
        .text-gradient-dream11 {
          background: linear-gradient(45deg, #FFD600, #D4145A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .neon-dream11 {
          background: linear-gradient(45deg, #FFD600, #D4145A);
          color: white;
          box-shadow: 0 0 20px rgba(255,214,0,0.4);
        }
        .neon-dream11:hover {
          box-shadow: 0 0 30px rgba(255,214,0,0.6);
        }
      `}</style>
    </div>
  );
}

