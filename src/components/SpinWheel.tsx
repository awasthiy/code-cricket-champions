
import React, { useState, useRef } from "react";
import { mockChallenges } from "@/data/mockData";
import { Button } from "@/components/ui/button";

// Utility to randomize and pick a challenge ID
function getRandomChallenge() {
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
  // Refs for sound playback
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [spinDeg, setSpinDeg] = useState(0);
  const [flash, setFlash] = useState(false);

  // Mapping the index of the chosen challenge to a segment
  const getChallengeIndex = (challenge: any) => {
    return mockChallenges.findIndex(ch => ch.id === challenge.id);
  };

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
    setFlash(false);
    playSpinSound();

    // Randomly select a challenge
    const chosen = getRandomChallenge();
    // Calculate wheel stopping angle so the selected segment lands on pointer
    const numSegments = mockChallenges.length;
    const segAngle = 360 / numSegments;
    const chosenIdx = getChallengeIndex(chosen);
    // To ensure random spins and realism
    const extraSpins = Math.floor(Math.random() * 2) + 5;
    const deg =
      360 * extraSpins +
      (360 - chosenIdx * segAngle - segAngle / 2); // pointer at top (0 deg)
    setSpinDeg(deg);

    setTimeout(() => {
      setSelected(chosen);
      setSpinning(false);
      setFlash(true);
      playWinSound();

      setTimeout(() => setFlash(false), 1200);
    }, 1850);
  };

  // Generate the pie segments for the wheel
  const renderWheelSegments = () => {
    const total = mockChallenges.length;
    return mockChallenges.map((challenge, idx) => {
      const segAngle = 360 / total;
      const rotate = segAngle * idx;
      const colorIdx = idx % panelColors.length;
      return (
        <g key={challenge.id}>
          <path
            d={describeArc(210, 210, 190, -90 + rotate, -90 + rotate + segAngle)}
            fill={`url(#segment-gradient-${colorIdx})`}
            stroke="#FFF"
            strokeWidth="3"
            style={{
              filter: selected?.id === challenge.id && flash
                ? "drop-shadow(0 0 30px #fff), drop-shadow(0 0 24px #FFD700)"
                : undefined,
              opacity: selected && selected.id !== challenge.id ? 0.57 : 1,
              transition: "opacity 0.45s, filter 0.45s"
            }}
          />
          {/* Challenge label */}
          <text
            x={210 + 147 * Math.cos(((rotate + segAngle / 2 - 90) * Math.PI) / 180)}
            y={210 + 147 * Math.sin(((rotate + segAngle / 2 - 90) * Math.PI) / 180)}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="1.05rem"
            fontWeight={selected?.id === challenge.id ? 900 : 700}
            fill={selected?.id === challenge.id && flash ? "#FFD600" : "#FFF"}
            style={{
              textShadow: selected?.id === challenge.id
                ? "0 0 18px #fff, 0 0 12px #FFD700"
                : "0 1px 2px #222",
              filter: selected?.id === challenge.id && flash ? "brightness(1.3)" : undefined,
              transition: "fill 0.24s"
            }}
            pointerEvents="none"
          >
            {challenge.title.length > 20
              ? challenge.title.slice(0, 17) + "…"
              : challenge.title}
          </text>
        </g>
      );
    });
  };

  // SVG helper
  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", cx, cy,
      "L", start.x, start.y,
      "A", r, r, 0, arcSweep, 0, end.x, end.y,
      "z"
    ].join(" ");
  }

  // For panel gradients
  const gradients = panelColors.map((grad, i) => (
    <linearGradient id={`segment-gradient-${i}`} key={i} x1="0%" y1="0%" x2="95%" y2="95%">
      {grad.split(" ").map((stop, idx) => (
        <stop
          key={stop}
          offset={idx === 0 ? "0%" : "100%"}
          stopColor={stop.replace(/from\-|\-to\-|\[(.*?)\]/g, '').replace('#', '').length === 6 ? '#' + stop.split('#')[1] : stop}
        />
      ))}
    </linearGradient>
  ));

  return (
    <div className="flex flex-col items-center gap-8 my-16">
      {/* Invisible audio elements for sound effects */}
      <audio ref={spinSoundRef} src="/spin-sound.mp3" preload="auto" />
      <audio ref={winSoundRef} src="/win-sound.mp3" preload="auto" />
      <div className="relative w-full max-w-[460px] mx-auto">
        {/* WHEEL */}
        <div
          className={`rounded-full bg-black/80 ring-4 ring-cricket-gold drop-shadow-xl mx-auto flex items-center justify-center transition-all duration-1000 ${
            spinning ? "spin-rubberband" : ""
          }`}
          style={{
            width: "420px",
            height: "420px",
            boxShadow:
              "0 10px 60px 0 #000A2A99, 0 2px 44px #FBB03B44, 0 0px 0px #FFFFFF00",
            transform: `rotate(${spinDeg}deg)`,
            transition: spinning
              ? "transform 1.7s cubic-bezier(0.21,0.7,0.4,1.2)"
              : "transform 0.6s cubic-bezier(.61,.16,.42,1.01)",
            position: "relative",
            zIndex: 2,
          }}
          aria-label={spinning ? "Wheel spinning" : "Spin wheel"}
        >
          <svg width={420} height={420} viewBox="0 0 420 420">
            <defs>{gradients}</defs>
            {renderWheelSegments()}
          </svg>
          {/* Sparkle effect */}
          {flash && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flash-pop">
              <span className="block w-[190px] h-[190px] rounded-full glow-flash" />
            </div>
          )}
        </div>
        {/* POINTER */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none z-40">
          {/* Arrow pointer in Dream11 colors */}
          <div className="w-14 h-14 flex items-center justify-center">
            <svg width={56} height={56} viewBox="0 0 56 56" className="rotate-45">
              <circle cx="28" cy="28" r="27" fill="#FFD600" stroke="#FFF" strokeWidth={4} />
              <polygon points="28,10 35,28 21,28" fill="#D4145A" />
            </svg>
          </div>
        </div>
      </div>
      <Button
        onClick={handleSpin}
        disabled={spinning}
        className="text-lg w-60 py-3 shadow-lg font-extrabold tracking-wider rounded-2xl neon-dream11"
        style={{
          letterSpacing: "0.04em",
        }}
      >
        {spinning ? "Spinning..." : "Spin Challenge Wheel"}
      </Button>
      {selected && (
        <div
          className={`mt-6 text-center transition-all duration-300 ease-out ${
            flash ? "scale-110" : ""
          }`}
        >
          <div className="font-bold text-3xl text-cricket-gold drop-shadow text-gradient-dream11">
            {selected.title}
          </div>
          <div className="mt-3 text-lg text-gray-100/80 max-w-md mx-auto dark:text-white/80">
            {selected.description}
          </div>
        </div>
      )}
      {/* Animations and dark mode enhancements */}
      <style>
        {`
          @keyframes spin-rubberband {
            0% {transform: rotate(0deg);}
            80% {transform: rotate(${spinDeg + 8}deg);}
            87% {transform: rotate(${spinDeg - 9}deg);}
            93% {transform: rotate(${spinDeg + 2}deg);}
            100% {transform: rotate(${spinDeg}deg);}
          }
          .spin-rubberband {
            animation: spin-rubberband 1.7s cubic-bezier(0.2,0.7,0.41,1.12);
          }
          .flash-pop {
            animation: dream-flash 1s cubic-bezier(.36,1.35,.38,.98);
            pointer-events: none;
          }
          .glow-flash {
            background: radial-gradient(ellipse at center, #FFF 0 32%, #FFD600 40% 65%, #fff0 90%);
            filter: blur(3px) brightness(1.2);
            opacity: .72;
            pointer-events: none;
          }
          @keyframes dream-flash {
            0%,100% { opacity: 0;}
            20% { opacity: .82;}
            48% { opacity: 1;}
            80% {opacity: .4;}
          }
          @media (max-width: 700px) {
            .spin-rubberband, .rounded-full {
              width: 96vw !important;
              height: 96vw !important;
              min-width: 244px;
              min-height: 244px;
              max-width: 99vw;
              max-height: 69vw;
            }
          }
          .neon-dream11 {
            background: linear-gradient(90deg,#D4145A 0%,#FBB03B 100%);
            box-shadow: 0 0 16px #FBB03B88, 0 2px 14px #62004B44;
            color: #fff !important;
            border: none;
            text-shadow: 0 2px 6px #62004B80;
            filter: brightness(1.13);
          }
          .text-gradient-dream11 {
            background: linear-gradient(90deg,#FFD600 10%,#FBB03B 60%,#d14 90%);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
        `}
      </style>
    </div>
  );
}

