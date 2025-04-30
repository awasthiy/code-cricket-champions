import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import TeamCard from "@/components/TeamCard";
import LeaderboardTable from "@/components/LeaderboardTable";
import PlayerLeaderboardTable from "@/components/PlayerLeaderboardTable";
import ChallengesList from "@/components/ChallengesList";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import GameStats from "@/components/GameStats";
import { Cricket } from "@/components/icons/Cricket";
import { mockTeams, mockPlayers, mockChallenges, scoreBreakdownData } from "@/data/mockData";
import { Users, Trophy, Target } from "lucide-react";
import GoogleAuth from "@/components/GoogleAuth";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-3 flex items-center gap-2">
              <span>Code Cricket Champions</span>
              <Badge className="ml-2 text-xs bg-cricket-gold text-black">Fantasy Bootcamp League</Badge>
            </h1>
            <p className="text-gray-600">
              Track your team's performance in our AI-powered bootcamp fantasy league!
            </p>
          </div>
          <GoogleAuth />
        </div>

        {/* Top Tile */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teams Competing */}
            <div className="bg-cricket-light rounded-lg p-4">
              <h3 className="text-cricket-purple font-semibold mb-2">Teams Competing</h3>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-cricket-purple" />
                <span className="text-2xl font-bold text-cricket-dark">{mockTeams.length}</span>
              </div>
            </div>

            {/* Challenge */}
            <div className="bg-cricket-light rounded-lg p-4">
              <h3 className="text-cricket-purple font-semibold mb-2">Challenge</h3>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-cricket-gold" />
                <span className="text-2xl font-bold text-cricket-dark">4</span>
              </div>
            </div>

            {/* Highest Score */}
            <div className="bg-cricket-light rounded-lg p-4">
              <h3 className="text-cricket-purple font-semibold mb-2">Highest Score</h3>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-cricket-gold" />
                <span className="text-2xl font-bold text-cricket-dark">Code Smashers</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mb-8">
          <GameStats />
        </div> */}
        
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
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-cricket-blue" />
                    Team Rankings
                  </h2>
                  <LeaderboardTable teams={mockTeams} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-cricket-purple" />
                    Player Rankings
                  </h2>
                  <PlayerLeaderboardTable players={mockPlayers} />
                </div>
              </div>
              {/* <div>
                <ScoreBreakdown {...scoreBreakdownData} />
              </div> */}
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
      </main>
      
      <footer className="bg-cricket-blue text-white py-3 px-4 text-center text-sm">
        Code Cricket Champions © 2025 | AI-Powered Bootcamp Fantasy League
      </footer>
    </div>
  );
};

export default Index;
