import { useEffect } from 'react';
import { Bell, Settings, CreditCard, Star, Globe, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDashboardStore } from '@/store/dashboard';
import { useAuthStore } from '@/store/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Task } from '@/types';

const TaskCard = ({ task }: { task: Task }) => (
  <Card className="hover:bg-gray-50">
    <CardHeader className="p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {task.is_global ? (
              <Globe className="h-4 w-4 text-blue-500" />
            ) : (
              <Home className="h-4 w-4 text-green-500" />
            )}
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <p className="text-gray-500">{task.description}</p>
        </div>
        <Badge variant={task.is_done === true ? 'default' : 'secondary'}>
          {task.is_done === true ? 'Completed' : 'Pending'}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
              <span>{task.reward} {"AT"}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-gray-500" />
              <span>Due: {new Date(task.date_time).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

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
  const { stats, localTasks, globalTasks, isLoading, error, fetchDashboardData } = useDashboardStore();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.username}</p>
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

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Tasks Completed"
          value={`${stats.tasksCompleted}/${stats.totalTasks}`}
          icon={Star}
          progress={(stats.tasksCompleted / stats.totalTasks) * 100}
        />
        <StatCard
          title="Tokens Earned"
          value={`${stats.tokensEarned} AT`}
          icon={CreditCard}
        />
        <StatCard
          title="USDT Earned"
          value={`$${stats.usdtEarned}`}
          icon={CreditCard}
        />
        <StatCard
          title="Rank Progress"
          value={`Rank ${stats.rank}`}
          icon={Star}
          progress={stats.rankProgress}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="local">
            <TabsList>
              <TabsTrigger value="local" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Local Tasks
              </TabsTrigger>
              <TabsTrigger value="global" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Global Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="local" className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                {localTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="global" className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                {globalTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AravtDashboard; 