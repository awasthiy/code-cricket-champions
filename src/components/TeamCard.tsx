
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy, Code, Star, Lightbulb } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
}

export interface TeamData {
  id: number;
  name: string;
  members: TeamMember[];
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

interface TeamCardProps {
  team: TeamData;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Card className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <CardHeader className={`pb-2 ${team.rank <= 3 ? 'bg-gradient-to-r from-cricket-blue to-cricket-purple text-white' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {team.rank <= 3 && (
              <Trophy className={`h-5 w-5 ${team.rank === 1 ? 'text-cricket-gold' : team.rank === 2 ? 'text-gray-300' : 'text-amber-700'}`} />
            )}
            {team.name}
          </h3>
          <Badge className={`${team.rank <= 3 ? 'bg-white text-cricket-blue' : 'bg-cricket-blue text-white'}`}>
            Rank #{team.rank}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Code className="h-4 w-4 text-cricket-purple" />
            <span className="text-sm font-medium">Challenge: {team.challenge.title}</span>
            <Badge variant="outline" className="ml-auto text-xs">
              {team.challenge.multiplier}x
            </Badge>
          </div>
          
          <div className="space-y-1 mb-4">
            {team.members.map((member, index) => (
              <div key={index} className="flex text-sm items-center">
                <span className="font-medium">{member.name}</span>
                <span className="text-xs text-gray-500 ml-2">({member.role})</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 border-t pt-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-cricket-gold" />
              <span>Fantasy: {team.scores.fantasy}</span>
            </div>
            <div className="flex items-center gap-1">
              <Code className="h-3.5 w-3.5 text-cricket-purple" />
              <span>Bootcamp: {team.scores.bootcamp}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-cricket-accent" />
              <span>Prediction: {team.scores.prediction}</span>
            </div>
            <div className="flex items-center gap-1">
              <Lightbulb className="h-3.5 w-3.5 text-cricket-warning" />
              <span>Skill: {team.scores.skill}</span>
            </div>
          </div>
          <div className="bg-cricket-light rounded-lg p-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Score:</span>
              <span className="text-xl font-bold text-cricket-blue">{team.scores.total}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
