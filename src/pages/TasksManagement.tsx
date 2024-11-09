import { useEffect } from 'react';
import { Plus, Search, Globe, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/auth';
import { useDashboardStore } from '@/store/dashboard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { TaskCard } from '@/components/TaskCard';

const TasksManagement = () => {
  const { user } = useAuthStore();
  const { 
    localTasks, 
    globalTasks, 
    isLoading, 
    error, 
    fetchDashboardData,
    updateTaskProgress 
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-gray-500">Manage your tasks and track progress</p>
        </div>
        {user.role !== 'User' && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tasks Overview</CardTitle>
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

            <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search tasks..." 
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="local" className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                {localTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={(taskId, updates) => 
                      updateTaskProgress(taskId, updates.progress || 0)
                    }
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="global" className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                {globalTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={(taskId, updates) => 
                      updateTaskProgress(taskId, updates.progress || 0)
                    }
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksManagement; 