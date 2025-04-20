
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import TeamCard from "@/components/TeamCard";
import LeaderboardTable from "@/components/LeaderboardTable";
import ChallengesList from "@/components/ChallengesList";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import GameStats from "@/components/GameStats";
import { Cricket } from "@/components/icons/Cricket";
import { Users, Trophy, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3 flex items-center gap-2">
            <Cricket className="h-8 w-8 text-cricket-blue" />
            <span>Code Cricket Champions</span>
            <Badge className="ml-2 text-xs bg-cricket-gold text-black">Fantasy Bootcamp League</Badge>
          </h1>
          <p className="text-gray-600">
            Track your team's performance in our AI-powered bootcamp fantasy league!
          </p>
        </div>
        
        <div className="mb-8">
          <GameStats />
        </div>
        
        <Tabs defaultValue="leaderboard" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="leaderboard" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" /> Leaderboard
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-1">
              <Users className="h-4 w-4" /> Teams
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-1">
              <Target className="h-4 w-4" /> Challenges
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <LeaderboardTable teams={mockTeams} />
              </div>
              <div>
                <ScoreBreakdown {...scoreBreakdownData} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="teams">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockTeams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="challenges">
            <ChallengesList challenges={mockChallenges} />
          </TabsContent>
        </Tabs>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-medium mb-2 text-lg">How Scoring Works</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium text-cricket-blue">Final score</span> = 
              Fantasy Score + (Bootcamp Project Score × Impact Multiplier) + 
              Prediction Bonus + Skill Score
            </p>
            <p>
              <span className="font-medium text-cricket-purple">Bootcamp Score</span>: 
              Milestone (+200 pts), PR drop (+150 pts), Demo (+100 pts), 
              Prompt Bonus (+50 pts), Platform-ready bonus (+150 pts)
            </p>
            <p>
              <span className="font-medium text-cricket-gold">Prediction Bonus</span>: 
              Correct Final 3 IPL Teams prediction (3× points if right)
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-cricket-blue text-white py-3 px-4 text-center text-sm">
        Code Cricket Champions © 2025 | AI-Powered Bootcamp Fantasy League
      </footer>
    </div>
  );
};

export default Index;

