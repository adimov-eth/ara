import React from 'react';
import { Bell, Settings, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TaskCard = ({ task, type }) => (
  <Card className="cursor-pointer hover:bg-gray-50">
    <CardHeader className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <p className="text-gray-500">{task.description}</p>
        </div>
        <Badge>
          {type === 'global' ? `${task.participants} participants` : task.status === 'in_progress' ? 'In Progress' : 'Open'}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-1" />
            {task.reward}
          </div>
          <div>Due: {task.deadline}</div>
        </div>
        {task.progress > 0 && (
          <Progress value={task.progress} className="w-24" />
        )}
      </div>
    </CardContent>
  </Card>
);

const AravtDashboard = ({ selectedAravt, userRank }) => {
  const localTasks = [
    {
      id: 1,
      title: 'Website Development',
      description: 'Create landing page for new project',
      reward: '500 USDT',
      deadline: '2024-11-20',
      status: 'in_progress',
      progress: 60
    },
    {
      id: 2,
      title: 'Smart Contract Audit',
      description: 'Security audit for token contract',
      reward: '1000 AT',
      deadline: '2024-11-25',
      status: 'open',
      progress: 0
    }
  ];

  const globalTasks = [
    {
      id: 3,
      title: 'Network Enhancement',
      description: 'Improve cross-aravt communication protocol',
      reward: '2000 AT',
      deadline: '2024-12-01',
      participants: 45,
      status: 'open'
    },
    {
      id: 4,
      title: 'Documentation',
      description: 'Create comprehensive platform documentation',
      reward: '800 USDT',
      deadline: '2024-11-30',
      participants: 12,
      status: 'in_progress'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{selectedAravt?.name || 'Aravt Dashboard'}</h1>
          <p className="text-gray-500">Member since Nov 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <Progress value={80} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tokens Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450 AT</div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">USDT Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
            <Progress value={40} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Rank Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rank {userRank}</div>
            <Progress value={userRank * 33.33} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="local">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="local">Local Tasks</TabsTrigger>
              <TabsTrigger value="global">Global Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="local">
              <div className="space-y-4 mt-4">
                {localTasks.map((task) => (
                  <TaskCard key={task.id} task={task} type="local" />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="global">
              <div className="space-y-4 mt-4">
                {globalTasks.map((task) => (
                  <TaskCard key={task.id} task={task} type="global" />
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