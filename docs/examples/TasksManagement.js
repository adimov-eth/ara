import React, { useState } from 'react';
import { Plus, CreditCard, Users, CalendarDays, CheckCircle2, Globe, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const TaskManagement = ({ isLeader = false }) => {
  const [tasks, setTasks] = useState({
    local: [
      {
        id: 1,
        title: 'Smart Contract Development',
        description: 'Develop and test token staking smart contract',
        reward: 1500,
        rewardType: 'USDT',
        deadline: '2024-12-01',
        status: 'in_progress',
        assignees: ['John D.', 'Sarah M.'],
        progress: 65,
        isGlobal: false,
        definitionOfDone: [
          'Complete smart contract code',
          'Pass security audit',
          'Deploy to testnet',
          'Documentation complete'
        ]
      },
      {
        id: 2,
        title: 'UI/UX Design',
        description: 'Design new dashboard interface',
        reward: 2000,
        rewardType: 'AT',
        deadline: '2024-11-25',
        status: 'open',
        assignees: [],
        progress: 0,
        isGlobal: false,
        definitionOfDone: [
          'Wireframes approved',
          'High-fidelity designs',
          'Interactive prototype',
          'Design system documentation'
        ]
      }
    ],
    global: [
      {
        id: 3,
        title: 'Cross-Chain Integration',
        description: 'Implement cross-chain token bridge',
        reward: 5000,
        rewardType: 'USDT',
        deadline: '2024-12-15',
        status: 'open',
        participants: 12,
        progress: 30,
        isGlobal: true,
        definitionOfDone: [
          'Bridge contract development',
          'Security audit completion',
          'Multi-chain testing',
          'Performance optimization'
        ]
      }
    ]
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const TaskCard = ({ task }) => (
    <Card className="hover:bg-gray-50">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {task.isGlobal ? (
                <Globe className="h-4 w-4 text-blue-500" />
              ) : (
                <Home className="h-4 w-4 text-green-500" />
              )}
              <CardTitle className="text-lg">{task.title}</CardTitle>
            </div>
            <CardDescription>{task.description}</CardDescription>
          </div>
          <Badge variant={task.status === 'in_progress' ? 'default' : 'secondary'}>
            {task.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
                <span>{task.reward} {task.rewardType}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {task.isGlobal ? (
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {task.participants} participants
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {task.assignees.map((assignee, index) => (
                <Avatar key={index} className="h-6 w-6">
                  <AvatarFallback className="text-xs">{assignee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              ))}
              {task.assignees.length === 0 && (
                <span className="text-sm text-gray-500">No assignees</span>
              )}
            </div>
          )}

          {task.progress > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-500">{task.progress}%</span>
              </div>
              <Progress value={task.progress} />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            setSelectedTask(task);
            setIsViewModalOpen(true);
          }}>
            View Details
          </Button>
          {isLeader && (
            <Button size="sm">Manage Task</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  const CreateTaskModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Task Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local Task</SelectItem>
                <SelectItem value="global">Global Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input placeholder="Enter task title" />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea placeholder="Enter task description" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Reward Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reward type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AT">Aravt Tokens (AT)</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Reward Amount</Label>
              <Input type="number" placeholder="Enter amount" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Deadline</Label>
            <Input type="date" />
          </div>

          <div className="grid gap-2">
            <Label>Definition of Done</Label>
            <Textarea placeholder="Enter criteria for task completion" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const ViewTaskModal = ({ task, isOpen, onClose }) => {
    if (!task) return null;
    
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {task.isGlobal ? (
                <Globe className="h-5 w-5 text-blue-500" />
              ) : (
                <Home className="h-5 w-5 text-green-500" />
              )}
              <DialogTitle>{task.title}</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-gray-500">{task.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Reward</h4>
                <p className="text-gray-500">{task.reward} {task.rewardType}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Deadline</h4>
                <p className="text-gray-500">{new Date(task.deadline).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Definition of Done</h4>
              <ul className="space-y-2">
                {task.definitionOfDone.map((criterion, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!task.isGlobal && (
              <div>
                <h4 className="text-sm font-medium mb-2">Assignees</h4>
                <div className="flex gap-2">
                  {task.assignees.map((assignee, index) => (
                    <Avatar key={index}>
                      <AvatarFallback>{assignee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  ))}
                  {task.assignees.length === 0 && (
                    <span className="text-gray-500">No assignees</span>
                  )}
                </div>
              </div>
            )}

            {task.progress > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Progress</h4>
                <div className="space-y-2">
                  <Progress value={task.progress} />
                  <p className="text-sm text-gray-500 text-right">{task.progress}% complete</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Close</Button>
            {isLeader && (
              <Button>Edit Task</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-gray-500">Manage your Aravt tasks</p>
        </div>
        {isLeader && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        )}
      </div>

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
            {tasks.local.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="global" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {tasks.global.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CreateTaskModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ViewTaskModal
        task={selectedTask}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
};

export default TaskManagement;