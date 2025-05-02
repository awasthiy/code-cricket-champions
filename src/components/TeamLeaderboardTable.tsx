
import React from 'react';
import { TeamData } from '../data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TeamLeaderboardTableProps {
  teams: TeamData[];
}

const TeamLeaderboardTable: React.FC<TeamLeaderboardTableProps> = ({ teams }) => {
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank);
  
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-cricket-blue">
          <TableRow>
            <TableHead className="text-white">Rank</TableHead>
            <TableHead className="text-white">Team</TableHead>
            <TableHead className="text-white">Members</TableHead>
            <TableHead className="text-white text-right">Fantasy Points</TableHead>
            <TableHead className="text-white text-right">Skill Score</TableHead>
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
                  {team.rank}
                </div>
              </TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>
                {team.members.map(m => m.name).join(', ')}
              </TableCell>
              <TableCell className="text-right">{team.scores.total.toLocaleString()}</TableCell>
              <TableCell className="text-right">{team.scores.skill.toLocaleString()}</TableCell>
              <TableCell className="font-bold text-right text-cricket-blue">
                {(team.scores.total + team.scores.skill).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamLeaderboardTable;
