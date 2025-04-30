// First define the interfaces
export interface PlayerData {
  id: number;
  name: string;
  teamId: number;
  teamName: string;
  role: string;
  challenge: {
    id: number;
    title: string;
    multiplier: number;
  };
  participation: {
    matchesPlayed: number;
    totalMatches: number;
    top3Finishes: number;
    participationRate: number;
    top3Rate: number;
    scorePerMatch: number;
    normalizedScore: number;
  };
  scores: {
    fantasy: number;
    bootcamp: number;
    skill: number;
    total: number;
    normalized: number;
  };
  rank: number;
}

export interface TeamData {
  id: number;
  name: string;
  members: Array<{ name: string; role: string }>;
  challenge: {
    id: number;
    title: string;
    multiplier: number;
  };
  scores: {
    fantasy: number;
    bootcamp: number;
    prediction: number;
    skill: number;
    total: number;
  };
  rank: number;
}

// Helper function to calculate normalized score with penalty
const calculateNormalizedScore = (totalScore: number, matchesPlayed: number, totalMatches: number) => {
  const scorePerMatch = totalScore / matchesPlayed;
  const participationRate = matchesPlayed / totalMatches;
  const baseNormalizedScore = scorePerMatch * totalMatches;
  
  // Apply 10% penalty if participation is less than 50%
  if (participationRate < 0.5) {
    return Math.round(baseNormalizedScore * 0.9);
  }
  
  return Math.round(baseNormalizedScore);
};

// Then define the mock data
export const mockPlayers: PlayerData[] = [
  {
    id: 1,
    name: "Anuj",
    teamId: 2,
    teamName: "Dev Dynamos",
    role: "Developer",
    challenge: {
      id: 3,
      title: "Test Like a Titan",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 42,
      totalMatches: 47,
      top3Finishes: 20,
      participationRate: 42/47,
      top3Rate: 20/42,
      scorePerMatch: 31157/42,
      normalizedScore: calculateNormalizedScore(31157, 42, 47)
    },
    scores: {
      fantasy: 30508,
      bootcamp: 0,
      skill: 649,
      total: 31157,
      normalized: calculateNormalizedScore(31157, 42, 47)
    },
    rank: 7
  },
  {
    id: 2,
    name: "Tejas",
    teamId: 2,
    teamName: "Dev Dynamos",
    role: "Developer",
    challenge: {
      id: 3,
      title: "Test Like a Titan",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 6,
      totalMatches: 47,
      top3Finishes: 2,
      participationRate: 6/47,
      top3Rate: 2/6,
      scorePerMatch: 4945/6,
      normalizedScore: calculateNormalizedScore(4945, 6, 47)
    },
    scores: {
      fantasy: 4412,
      bootcamp: 0,
      skill: 533,
      total: 4945,
      normalized: calculateNormalizedScore(4945, 6, 47)
    },
    rank: 1
  },
  {
    id: 3,
    name: "Prathmesh",
    teamId: 3,
    teamName: "Debug Warriors",
    role: "Developer",
    challenge: {
      id: 5,
      title: "Alfred the Ops Whisperer",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 38,
      totalMatches: 47,
      top3Finishes: 14,
      participationRate: 38/47,
      top3Rate: 14/38,
      scorePerMatch: 27737/38,
      normalizedScore: calculateNormalizedScore(27737, 38, 47)
    },
    scores: {
      fantasy: 27114,
      bootcamp: 0,
      skill: 623,
      total: 27737,
      normalized: calculateNormalizedScore(27737, 38, 47)
    },
    rank: 8
  },
  {
    id: 4,
    name: "Ashutosh",
    teamId: 3,
    teamName: "Debug Warriors",
    role: "Developer",
    challenge: {
      id: 5,
      title: "Alfred the Ops Whisperer",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 7,
      totalMatches: 47,
      top3Finishes: 3,
      participationRate: 7/47,
      top3Rate: 3/7,
      scorePerMatch: 5431/7,
      normalizedScore: calculateNormalizedScore(5431, 7, 47)
    },
    scores: {
      fantasy: 4825,
      bootcamp: 0,
      skill: 606,
      total: 5431,
      normalized: calculateNormalizedScore(5431, 7, 47)
    },
    rank: 2
  },
  {
    id: 5,
    name: "Ashish",
    teamId: 4,
    teamName: "Code Smashers",
    role: "Developer",
    challenge: {
      id: 4,
      title: "Fix It Before It Breaks",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 36,
      totalMatches: 47,
      top3Finishes: 20,
      participationRate: 36/47,
      top3Rate: 20/36,
      scorePerMatch: 27428/36,
      normalizedScore: calculateNormalizedScore(27428, 36, 47)
    },
    scores: {
      fantasy: 26758,
      bootcamp: 0,
      skill: 670,
      total: 27428,
      normalized: calculateNormalizedScore(27428, 36, 47)
    },
    rank: 5
  },
  {
    id: 6,
    name: "Mohit",
    teamId: 4,
    teamName: "Code Smashers",
    role: "Developer",
    challenge: {
      id: 4,
      title: "Fix It Before It Breaks",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 44,
      totalMatches: 47,
      top3Finishes: 25,
      participationRate: 44/47,
      top3Rate: 25/44,
      scorePerMatch: 33807/44,
      normalizedScore: calculateNormalizedScore(33807, 44, 47)
    },
    scores: {
      fantasy: 33065,
      bootcamp: 0,
      skill: 742,
      total: 33807,
      normalized: calculateNormalizedScore(33807, 44, 47)
    },
    rank: 4
  },
  {
    id: 7,
    name: "Yash M",
    teamId: 5,
    teamName: "UI Spartans",
    role: "Developer",
    challenge: {
      id: 7,
      title: "Reviewer of Realms",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 43,
      totalMatches: 47,
      top3Finishes: 23,
      participationRate: 43/47,
      top3Rate: 23/43,
      scorePerMatch: 32206/43,
      normalizedScore: calculateNormalizedScore(32206, 43, 47)
    },
    scores: {
      fantasy: 31435,
      bootcamp: 0,
      skill: 771,
      total: 32206,
      normalized: calculateNormalizedScore(32206, 43, 47)
    },
    rank: 6
  },
  {
    id: 8,
    name: "Yash A",
    teamId: 5,
    teamName: "UI Spartans",
    role: "Developer",
    challenge: {
      id: 7,
      title: "Reviewer of Realms",
      multiplier: 1.0
    },
    participation: {
      matchesPlayed: 44,
      totalMatches: 47,
      top3Finishes: 25,
      participationRate: 44/47,
      top3Rate: 25/44,
      scorePerMatch: 33859/44,
      normalizedScore: calculateNormalizedScore(33859, 44, 47)
    },
    scores: {
      fantasy: 33164,
      bootcamp: 0,
      skill: 695,
      total: 33859,
      normalized: calculateNormalizedScore(33859, 44, 47)
    },
    rank: 3
  }
];

// Sort players by normalized score
mockPlayers.sort((a, b) => b.scores.normalized - a.scores.normalized);
mockPlayers.forEach((player, index) => {
  player.rank = index + 1;
});

export const mockTeams: TeamData[] = [
  {
    id: 2,
    name: "Dev Dynamos",
    members: [
      { name: "Anuj", role: "Developer" },
      { name: "Tejas", role: "Developer" }
    ],
    challenge: {
      id: 3,
      title: "Test Like a Titan",
      multiplier: 1.0
    },
    scores: {
      fantasy: 34920,
      bootcamp: 0,
      prediction: 0,
      skill: 1182,
      total: mockPlayers.filter(p => p.teamId === 2).reduce((sum, p) => sum + p.scores.normalized, 0)
    },
    rank: 1
  },
  {
    id: 3,
    name: "Debug Warriors",
    members: [
      { name: "Prathmesh", role: "Developer" },
      { name: "Ashutosh", role: "Developer" }
    ],
    challenge: {
      id: 5,
      title: "Alfred the Ops Whisperer",
      multiplier: 1.0
    },
    scores: {
      fantasy: 31939,
      bootcamp: 0,
      prediction: 0,
      skill: 1229,
      total: mockPlayers.filter(p => p.teamId === 3).reduce((sum, p) => sum + p.scores.normalized, 0)
    },
    rank: 4
  },
  {
    id: 4,
    name: "Code Smashers",
    members: [
      { name: "Ashish", role: "Developer" },
      { name: "Mohit", role: "Developer" }
    ],
    challenge: {
      id: 4,
      title: "Fix It Before It Breaks",
      multiplier: 1.0
    },
    scores: {
      fantasy: 59823,
      bootcamp: 0,
      prediction: 0,
      skill: 1412,
      total: mockPlayers.filter(p => p.teamId === 4).reduce((sum, p) => sum + p.scores.normalized, 0)
    },
    rank: 2
  },
  {
    id: 5,
    name: "UI Spartans",
    members: [
      { name: "Yash M", role: "Developer" },
      { name: "Yash A", role: "Developer" }
    ],
    challenge: {
      id: 7,
      title: "Reviewer of Realms",
      multiplier: 1.0
    },
    scores: {
      fantasy: 64599,
      bootcamp: 0,
      prediction: 0,
      skill: 1466,
      total: mockPlayers.filter(p => p.teamId === 5).reduce((sum, p) => sum + p.scores.normalized, 0)
    },
    rank: 3
  }
];

// Sort teams by normalized total score
mockTeams.sort((a, b) => b.scores.total - a.scores.total);
mockTeams.forEach((team, index) => {
  team.rank = index + 1;
});

export const mockChallenges = [
  {
    id: 3,
    title: "Test Like a Titan",
    description: "GenAI-powered unit test + functional test CLI for RN, Web Dashboards",
    multiplier: 1.0
  },
  {
    id: 5,
    title: "Alfred the Ops Whisperer",
    description: "Slack-integrated LLM bot with prompt-aware on-call job support",
    multiplier: 1.0
  },
  {
    id: 4,
    title: "Fix It Before It Breaks",
    description: "Auto-PR fixer for CI failures + standard CI generation",
    multiplier: 1.0
  },
  {
    id: 7,
    title: "Reviewer of Realms",
    description: "AI-powered Doc & PR Reviewer bot (Claude-based)",
    multiplier: 1.0
  }
];

export const scoreBreakdownData = {
  title: "Score Breakdown",
  totalScore: 66065, // Highest team score (UI Spartans)
  maxScore: 2000,   // Theoretical max
  categories: [
    {
      name: "Fantasy IPL Points",
      value: 64599,
      color: "#0E4B8F" // cricket-blue
    },
    {
      name: "Bootcamp Progress",
      value: 0,
      color: "#6C1BAB" // cricket-purple
    },
    {
      name: "Skill Score",
      value: 1466,
      color: "#FF6B6B" // cricket-accent
    }
  ]
};
