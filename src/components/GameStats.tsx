
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Target, Code } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

const StatCard = ({ title, value, icon, description }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const GameStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Teams Competing"
        value="4"
        icon={<Users className="h-4 w-4 text-cricket-blue" />}
        description="8 engineers in pairs"
      />
      <StatCard
        title="Challenges"
        value="11"
        icon={<Target className="h-4 w-4 text-cricket-purple" />}
        description="With impact multipliers"
      />
      <StatCard
        title="Highest Score"
        value="1,254"
        icon={<Trophy className="h-4 w-4 text-cricket-gold" />}
        description="Team BugBusters"
      />
      <StatCard
        title="PRs Created"
        value="24"
        icon={<Code className="h-4 w-4 text-cricket-accent" />}
        description="Across all teams"
      />
    </div>
  );
};

export default GameStats;
