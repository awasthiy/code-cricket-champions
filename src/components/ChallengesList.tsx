
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Challenge {
  id: number;
  title: string;
  description: string;
  multiplier: number;
}

interface ChallengesListProps {
  challenges: Challenge[];
}

const ChallengesList = ({ challenges }: ChallengesListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {challenges.map(challenge => (
        <Card key={challenge.id} className="border-l-4" style={{ borderLeftColor: getMultiplierColor(challenge.multiplier) }}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-md font-bold">{challenge.title}</CardTitle>
              <Badge 
                className="ml-2" 
                style={{ 
                  backgroundColor: getMultiplierColor(challenge.multiplier),
                  color: 'white'
                }}
              >
                {challenge.multiplier}x
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{challenge.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to get color based on multiplier
function getMultiplierColor(multiplier: number): string {
  if (multiplier >= 3) return '#6C1BAB'; // purple
  if (multiplier >= 2.5) return '#0E4B8F'; // blue
  if (multiplier >= 2) return '#4CAF50'; // green
  return '#F9A825'; // gold/yellow
}

export default ChallengesList;
