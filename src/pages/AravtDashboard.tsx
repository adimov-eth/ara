import { useEffect, useState } from 'react';
import { Bell, Settings, CreditCard, Star} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDashboardStore } from '@/store/dashboard';
import { useAuthStore } from '@/store/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import CreateAravtForm from '@/components/CreateAravtForm';

const StatCard = ({ title, value, icon: Icon, progress }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  progress?: number;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-500" />
        {value}
      </div>
      {progress !== undefined && (
        <Progress value={progress} className="mt-2" />
      )}
    </CardContent>
  </Card>
);

const AravtDashboard = () => {
  const { stats, isLoading: dashboardLoading, error: dashboardError, fetchDashboardData } = useDashboardStore();
  const user = useAuthStore(state => state.user);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (dashboardLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{user?.aravt?.name}</h1>
          <p className="text-gray-500">{user?.username} you are in the Aravt</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {dashboardError && (
        <Alert variant="destructive">
          <AlertDescription>{dashboardError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Tasks Completed"
          value={`${stats.tasksCompleted}/${stats.totalTasks}`}
          icon={Star}
          progress={(stats.tasksCompleted / stats.totalTasks) * 100}
        />
        <StatCard
          title="Tokens Earned"
          value={`${stats.tokensEarned} ARAVT`}
          icon={CreditCard}
        />
        <StatCard
          title="Rank Progress"
          value={`Rank ${stats.rank}`}
          icon={Star}
          progress={stats.rankProgress}
        />
      </div>

      <div className="">
        {user?.able_to_create_aravt && (
          <Button variant="outline" size="lg" onClick={() => setIsFormOpen(true)}>
            Create Aravt
          </Button>
        )}
      </div>

      {isFormOpen && <CreateAravtForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default AravtDashboard; 