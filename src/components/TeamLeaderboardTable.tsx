
import React, { useEffect, useState } from 'react';
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
import { parseCSV, groupPlayersByTeam, PlayerData } from '@/utils/csvParser';

interface TeamLeaderboardTableProps {
  teams?: TeamData[];
}

// Raw CSV data from the file
const rawCSVData = `Player,Team,Challenge Accepted,Prediction Finalist Team 1,Prediction Finalist Team 2,Fantasy Leaderboard points,Skill Score
Anuj,Dev Dynamos,Choice1: Test like a Titan,,30508,649
Tejas,Dev Dynamos,,,4412,533
Ashish,Code Smashers,"Choice1: Fix it Before it Breaks
Choice2: From Draw to Jaw",,26758,670
Mohit,Code Smashers,,,33065,742
Prathmesh,Debug Warriors,"Choice1: Alfred the Ops Whisperer
Choice2: The Gift of Code",,27114,623
Ashutosh,Debug Warriors,,,4825,606
Yash M,UI Spartans,"Choice1: Reviewer of Realms
Choice2: Scaffold Socery",,31435,771
Yash A,UI Spartans,,,33164,700`;

const TeamLeaderboardTable: React.FC<TeamLeaderboardTableProps> = ({ teams: propTeams }) => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  
  useEffect(() => {
    if (propTeams) {
      setTeams(propTeams);
      return;
    }
    
    // Parse CSV data if no teams provided as props
    const players = parseCSV(rawCSVData);
    const teamGroups = groupPlayersByTeam(players);
    
    // Convert to TeamData format
    const teamsData = Object.entries(teamGroups).map(([teamName, teamPlayers], index) => {
      const totalFantasyPoints = teamPlayers.reduce((sum, player) => sum + player.fantasyPoints, 0);
      const totalSkillScore = teamPlayers.reduce((sum, player) => sum + player.skillScore, 0);
      
      return {
        id: index.toString(),
        name: teamName,
        rank: index + 1, // Will be sorted later
        members: teamPlayers.map(p => ({ id: p.name, name: p.name })),
        scores: {
          total: totalFantasyPoints,
          skill: totalSkillScore
        },
        challenge: [] // Add the missing challenge property to satisfy the TeamData type
      };
    });
    
    // Sort by total score
    const sortedTeams = teamsData.sort((a, b) => 
      ((b.scores.total + b.scores.skill) - (a.scores.total + a.scores.skill))
    );
    
    // Assign ranks based on the sort
    sortedTeams.forEach((team, idx) => {
      team.rank = idx + 1;
    });
    
    setTeams(sortedTeams);
  }, [propTeams]);
  
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
