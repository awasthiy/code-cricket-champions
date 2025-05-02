
export interface PlayerData {
  name: string;
  team: string;
  challengeAccepted: string;
  predictionFinalist1: string;
  predictionFinalist2: string;
  fantasyPoints: number;
  skillScore: number;
}

export const parseCSV = (csvText: string): PlayerData[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      name: values[0],
      team: values[1],
      challengeAccepted: values[2],
      predictionFinalist1: values[3],
      predictionFinalist2: values[4],
      fantasyPoints: parseInt(values[5]) || 0,
      skillScore: parseInt(values[6]) || 0
    };
  });
};

export const groupPlayersByTeam = (players: PlayerData[]) => {
  const teams: { [key: string]: PlayerData[] } = {};
  
  players.forEach(player => {
    if (!teams[player.team]) {
      teams[player.team] = [];
    }
    teams[player.team].push(player);
  });
  
  return teams;
};
