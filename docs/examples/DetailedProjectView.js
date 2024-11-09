import React, { useState } from 'react';
import { 
  Users, CreditCard, Calendar, ListChecks, ChevronRight, 
  Clock, AlertCircle, ArrowUpRight, BarChart3, Plus 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ProjectDetails = ({ userRank = 1 }) => {
  // Example project data
  const project = {
    id: 1,
    name: 'DeFi Protocol Development',
    description: 'Building a next-generation decentralized exchange platform with advanced trading features and cross-chain capabilities.',
    status: 'active',
    progress: 65,
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    budget: '50000 USDT',
    spent: '32500 USDT',
    members: [
      { id: 1, name: 'Alex Chen', role: 'Project Lead', avatar: null, status: 'online' },
      { id: 2, name: 'Maria Garcia', role: 'Smart Contract Dev', avatar: null, status: 'offline' },
      { id: 3, name: 'John Smith', role: 'Frontend Dev', avatar: null, status: 'online' }
    ],
    milestones: [
      { id: 1, name: 'Smart Contract Development', progress: 80, deadline: '2024-10-15', status: 'completed' },
      { id: 2, name: 'Frontend Implementation', progress: 60, deadline: '2024-11-30', status: 'in_progress' },
      { id: 3, name: 'Security Audit', progress: 20, deadline: '2024-12-15', status: 'in_progress' }
    ],
    tasks: [
      { id: 1, title: 'Implement Swap Function', status: 'completed', assignee: 'Maria Garcia', priority: 'high' },
      { id: 2, title: 'Design User Dashboard', status: 'in_progress', assignee: 'John Smith', priority: 'medium' },
      { id: 3, title: 'Integrate Wallet Connect', status: 'pending', assignee: 'Alex Chen', priority: 'high' }
    ],
    metrics: {
      taskCompletion: 70,
      onSchedule: 85,
      budgetUtilization: 65,
      teamPerformance: 90
    }
  };

  const TeamMember = ({ member }) => (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={member.avatar} />
          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-sm text-gray-500">{member.role}</div>
        </div>
      </div>
      <Badge variant={member.status === 'online' ? 'default' : 'outline'}>
        {member.status}
      </Badge>
    </div>
  );

  const TaskCard = ({ task }) => (
    <Card className="mb-2">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{task.title}</div>
            <div className="text-sm text-gray-500">Assigned to: {task.assignee}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={
              task.priority === 'high' ? 'destructive' : 
              task.priority === 'medium' ? 'secondary' : 
              'outline'
            }>
              {task.priority}
            </Badge>
            <Badge variant={
              task.status === 'completed' ? 'default' : 
              task.status === 'in_progress' ? 'secondary' : 
              'outline'
            }>
              {task.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MilestoneCard = ({ milestone }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">{milestone.name}</div>
            <Badge variant={
              milestone.status === 'completed' ? 'default' : 
              milestone.status === 'in_progress' ? 'secondary' : 
              'outline'
            }>
              {milestone.status}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            Due: {new Date(milestone.deadline).toLocaleDateString()}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-medium">{milestone.progress}%</span>
            </div>
            <Progress value={milestone.progress} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 space-y-6">
      {/* Project Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <Badge variant="secondary" className="text-base">
              {project.status}
            </Badge>
          </div>
          <p className="text-gray-500 max-w-2xl">{project.description}</p>
        </div>
        {userRank > 0 && (
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Project Settings
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Clock className="h-4 w-4 inline mr-2" />
              {Math.round((new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.spent}</div>
            <div className="text-sm text-gray-500">of {project.budget}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.members.length} members</div>
            <div className="flex -space-x-2 mt-2">
              {project.members.map((member) => (
                <Avatar key={member.id} className="border-2 border-white">
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {project.progress < 20 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Project needs attention</AlertTitle>
          <AlertDescription>
            The project is falling behind schedule. Consider reviewing resource allocation and timelines.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Start Date</div>
                        <div className="text-sm text-gray-500">
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                      <div>
                        <div className="font-medium">End Date</div>
                        <div className="text-sm text-gray-500">
                          {new Date(project.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.tasks.slice(0, 3).map(task => (
                        <div key={task.id} className="flex items-center gap-2">
                          <Badge variant="outline">{task.status}</Badge>
                          <span>{task.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Budget</span>
                        <span className="font-medium">{project.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spent</span>
                        <span className="font-medium">{project.spent}</span>
                      </div>
                      <Progress 
                        value={(parseInt(project.spent) / parseInt(project.budget)) * 100} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Project Tasks</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
              <div className="space-y-2">
                {project.tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Project Milestones</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </div>
              <div>
                {project.milestones.map(milestone => (
                  <MilestoneCard key={milestone.id} milestone={milestone} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Task Completion Rate</span>
                        <span className="font-medium">{project.metrics.taskCompletion}%</span>
                      </div>
                      <Progress value={project.metrics.taskCompletion} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Schedule Adherence</span>
                        <span className="font-medium">{project.metrics.onSchedule}%</span>
                      </div>
                      <Progress value={project.metrics.onSchedule} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Budget Utilization</span>
                        <span className="font-medium">{project.metrics.budgetUtilization}%</span>
                      </div>
                      <Progress value={project.metrics.budgetUtilization} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Team Performance</span>
                        <span className="font-medium">{project.metrics.teamPerformance}%</span>
                      </div>
                      <Progress value={project.metrics.teamPerformance} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle></CardTitle>

                    <CardTitle>Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Task Completion Trend</span>
                        <Badge variant="secondary">
                          <ArrowUpRight className="h-4 w-4 mr-1 inline" />
                          +15%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Budget Efficiency</span>
                        <Badge variant="secondary">
                          <ArrowUpRight className="h-4 w-4 mr-1 inline" />
                          +8%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Team Velocity</span>
                        <Badge variant="secondary">
                          <ArrowUpRight className="h-4 w-4 mr-1 inline" />
                          +12%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.members.map(member => (
                  <TeamMember key={member.id} member={member} />
                ))}
                {userRank > 0 && (
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <ListChecks className="h-4 w-4 mr-2" />
                  View Task Board
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                {userRank > 0 && (
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Permissions
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="link" className="w-full justify-start p-0">
                  <Globe className="h-4 w-4 mr-2" />
                  Project Documentation
                </Button>
                <Button variant="link" className="w-full justify-start p-0">
                  <Wallet className="h-4 w-4 mr-2" />
                  Budget Details
                </Button>
                <Button variant="link" className="w-full justify-start p-0">
                  <Users className="h-4 w-4 mr-2" />
                  Team Directory
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;