import { TeamData } from "@/components/TeamCard";

export const mockTeams: TeamData[] = [
  {
    id: 1,
    name: "Sportans",
    members: [],
    challenge: {
      id: 2,
      title: "From Draw to Jaw",
      multiplier: 3.0
    },
    scores: {
      fantasy: 450,
      bootcamp: 380,
      prediction: 200,
      skill: 120,
      total: 1150
    },
    rank: 2
  },
  {
    id: 2,
    name: "Dev Dynamos",
    members: [
      { name: "Anuj", role: "Developer" },
      { name: "Tejas", role: "Developer" }
    ],
    challenge: {
      id: 1,
      title: "Health Is Wealth",
      multiplier: 2.5
    },
    scores: {
      fantasy: 512,
      bootcamp: 425,
      prediction: 250,
      skill: 67,
      total: 1254
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
      multiplier: 3.0
    },
    scores: {
      fantasy: 389,
      bootcamp: 356,
      prediction: 100,
      skill: 90,
      total: 935
    },
    rank: 3
  },
  {
    id: 4,
    name: "Code Smashers",
    members: [
      { name: "Ashish", role: "Developer" },
      { name: "Mohit", role: "Developer" }
    ],
    challenge: {
      id: 7,
      title: "Reviewer of Realms",
      multiplier: 2.0
    },
    scores: {
      fantasy: 315,
      bootcamp: 290,
      prediction: 50,
      skill: 145,
      total: 800
    },
    rank: 4
  },
  {
    id: 5,
    name: "UI Spartans",
    members: [
      { name: "Yash", role: "Developer" },
      { name: "Yash A", role: "Developer" }
    ],
    challenge: {
      id: 8,
      title: "Scaffold Sorcery",
      multiplier: 2.5
    },
    scores: {
      fantasy: 280,
      bootcamp: 270,
      prediction: 60,
      skill: 110,
      total: 720
    },
    rank: 5
  }
];

export const mockChallenges = [
  {
    id: 1,
    title: "Health Is Wealth",
    description: "Generate AI healthchecks for Node/Python services + CI Pipelines + Mobile/CD jobs",
    multiplier: 2.5
  },
  {
    id: 2,
    title: "From Draw to Jaw",
    description: "Build a Figma-to-Code AI CLI tool for Dream Design System",
    multiplier: 3.0
  },
  {
    id: 3,
    title: "Test Like a Titan",
    description: "GenAI-powered unit test + functional test CLI for RN, Web Dashboards",
    multiplier: 2.5
  },
  {
    id: 4,
    title: "Fix It Before It Breaks",
    description: "Auto-PR fixer for CI failures + standard CI generation",
    multiplier: 2.0
  },
  {
    id: 5,
    title: "Alfred the Ops Whisperer",
    description: "Slack-integrated LLM bot with prompt-aware on-call job support",
    multiplier: 3.0
  },
  {
    id: 6,
    title: "The Gift of Code",
    description: "Codepushable feature generation CLI for IPL Finals",
    multiplier: 2.5
  },
  {
    id: 7,
    title: "Reviewer of Realms",
    description: "AI-powered Doc & PR Reviewer bot (Claude-based)",
    multiplier: 2.0
  },
  {
    id: 8,
    title: "Scaffold Sorcery",
    description: "Full-stack GenAI scaffold for backend services (Node/Vert.x)",
    multiplier: 2.5
  }
];

export const scoreBreakdownData = {
  title: "Score Breakdown",
  totalScore: 1254, // Highest team score
  maxScore: 2000,   // Theoretical max
  categories: [
    {
      name: "Fantasy IPL Points",
      value: 512,
      color: "#0E4B8F" // cricket-blue
    },
    {
      name: "Bootcamp Progress",
      value: 425,
      color: "#6C1BAB" // cricket-purple
    },
    {
      name: "Prediction Bonus",
      value: 250,
      color: "#F2C94C" // cricket-gold
    },
    {
      name: "Skill Score",
      value: 67,
      color: "#FF6B6B" // cricket-accent
    }
  ]
};
