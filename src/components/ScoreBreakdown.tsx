
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreBreakdownProps {
  title: string;
  totalScore: number;
  maxScore: number;
  categories: {
    name: string;
    value: number;
    color: string;
  }[];
}

const ScoreBreakdown = ({ title, totalScore, maxScore, categories }: ScoreBreakdownProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Total Score</span>
            <span className="text-sm font-bold">{totalScore} / {maxScore}</span>
          </div>
          <Progress value={(totalScore / maxScore) * 100} className="h-2" />
        </div>
        
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{category.name}</span>
                <span className="text-sm font-medium">{category.value} pts</span>
              </div>
              <Progress 
                value={(category.value / totalScore) * 100} 
                className="h-1.5" 
                style={{ backgroundColor: `${category.color}25` }} // Light version of color
                indicatorColor={category.color}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBreakdown;
