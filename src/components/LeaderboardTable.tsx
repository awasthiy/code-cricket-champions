
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TeamData } from "./TeamCard";
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeaderboardTableProps {
  teams: TeamData[];
}

const LeaderboardTable = ({ teams }: LeaderboardTableProps) => {
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank);
  
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-cricket-blue text-white">
          <TableRow>
            <TableHead className="text-white">Rank</TableHead>
            <TableHead className="text-white">Team</TableHead>
            <TableHead className="text-white">Challenge</TableHead>
            <TableHead className="text-white text-right">Fantasy</TableHead>
            <TableHead className="text-white text-right">Bootcamp</TableHead>
            <TableHead className="text-white text-right">Prediction</TableHead>
            <TableHead className="text-white text-right">Skill</TableHead>
            <TableHead className="text-white text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTeams.map((team) => (
            <TableRow key={team.id} className={team.rank === 1 ? "bg-cricket-light/50" : ""}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-1">
                  {team.rank === 1 && <Trophy className="h-4 w-4 text-cricket-gold" />}
                  {team.rank === 2 && <Trophy className="h-4 w-4 text-gray-400" />}
                  {team.rank === 3 && <Trophy className="h-4 w-4 text-amber-700" />}
                  {team.rank > 3 && team.rank}
                  <span className="ml-1 flex items-center">
                    {Math.random() > 0.5 ? 
                      <ArrowUp className="h-3 w-3 text-cricket-success" /> : 
                      Math.random() > 0.5 ? 
                        <ArrowDown className="h-3 w-3 text-cricket-accent" /> : 
                        <Minus className="h-3 w-3 text-gray-400" />
                    }
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[150px]">{team.challenge.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {team.challenge.multiplier}x
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">{team.scores.fantasy}</TableCell>
              <TableCell className="text-right">{team.scores.bootcamp}</TableCell>
              <TableCell className="text-right">{team.scores.prediction}</TableCell>
              <TableCell className="text-right">{team.scores.skill}</TableCell>
              <TableCell className="font-bold text-right text-cricket-blue">
                {team.scores.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
