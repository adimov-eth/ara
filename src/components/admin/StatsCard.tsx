import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  progress?: number;
  subtitle?: string;
}

export const StatsCard = ({ title, value, icon: Icon, progress, subtitle }: StatsCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {value}
      </div>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      {progress !== undefined && <Progress value={progress} className="mt-2" />}
    </CardContent>
  </Card>
); 