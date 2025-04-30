import React from 'react';
import { PlayerData } from '../data/mockData';
import { Trophy, ArrowUp, ArrowDown, Minus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlayerLeaderboardTableProps {
  players: PlayerData[];
}

const PlayerLeaderboardTable: React.FC<PlayerLeaderboardTableProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => a.rank - b.rank);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fantasy Points</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {players.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.rank}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.teamName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.scores.normalized.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.scores.skill.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {(player.scores.normalized + player.scores.skill).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerLeaderboardTable; 