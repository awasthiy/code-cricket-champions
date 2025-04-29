import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PlayerData } from "@/data/mockData";
import { Trophy, ArrowUp, ArrowDown, Minus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlayerLeaderboardTableProps {
  players: PlayerData[];
}

const PlayerLeaderboardTable = ({ players }: PlayerLeaderboardTableProps) => {
  const sortedPlayers = [...players].sort((a, b) => a.rank - b.rank);
  
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-cricket-purple text-white">
          <TableRow>
            <TableHead className="text-white">Rank</TableHead>
            <TableHead className="text-white">Player</TableHead>
            <TableHead className="text-white">Team</TableHead>
            <TableHead className="text-white text-right">Fantasy</TableHead>
            <TableHead className="text-white text-right">Bootcamp</TableHead>
            <TableHead className="text-white text-right">Prediction</TableHead>
            <TableHead className="text-white text-right">Skill</TableHead>
            <TableHead className="text-white text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player) => (
            <TableRow key={player.id} className={player.rank === 1 ? "bg-cricket-light/50" : ""}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-1">
                  {player.rank === 1 && <Trophy className="h-4 w-4 text-cricket-gold" />}
                  {player.rank === 2 && <Trophy className="h-4 w-4 text-gray-400" />}
                  {player.rank === 3 && <Trophy className="h-4 w-4 text-amber-700" />}
                  {player.rank > 3 && player.rank}
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
              <TableCell className="font-medium">{player.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-cricket-purple" />
                  <span className="truncate max-w-[150px]">{player.teamName}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{player.scores.fantasy}</TableCell>
              <TableCell className="text-right">{player.scores.bootcamp}</TableCell>
              <TableCell className="text-right">{player.scores.prediction}</TableCell>
              <TableCell className="text-right">{player.scores.skill}</TableCell>
              <TableCell className="font-bold text-right text-cricket-purple">
                {player.scores.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayerLeaderboardTable; 