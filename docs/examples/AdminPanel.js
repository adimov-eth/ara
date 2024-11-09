import React, { useState } from 'react';
import { Plus, Users, Settings, Globe, Wallet, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminPanel = ({ userRank = 1 }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Admin Overview Stats
  const stats = {
    totalMembers: 25,
    activeTasks: 12,
    taskCompletion: 85,
    averageRating: 4.7,
    totalRewards: '25,000 USDT',
    pendingRequests: 3
  };

  const TaskCreationModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
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
                  <SelectItem value="tokens">Aravt Tokens</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
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
            <Textarea placeholder="Enter completion criteria" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-500">Manage your Aravt community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Community Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers} Members</div>
            <Badge className="mt-1">{stats.pendingRequests} pending requests</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTasks} Active Tasks</div>
            <Badge variant="secondary" className="mt-1">{stats.taskCompletion}% completion rate</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Rewards Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRewards}</div>
            <Badge variant="outline" className="mt-1">Avg Rating: {stats.averageRating}</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">Task Management</h2>
                  <p className="text-sm text-gray-500">Create and manage tasks for your community</p>
                </div>
                <Button onClick={() => setIsTaskModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Create New Task
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Local Tasks</CardTitle>
                    <CardDescription>Tasks for your immediate group</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Manage Local Tasks</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Global Tasks</CardTitle>
                    <CardDescription>Network-wide opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Manage Global Tasks</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">Member Management</h2>
                  <p className="text-sm text-gray-500">Manage your community members</p>
                </div>
                <Button onClick={() => setIsInviteModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Invite Member
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Member Overview</CardTitle>
                    <CardDescription>Current member status and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Members</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Applications</CardTitle>
                    <CardDescription>Review and manage join requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Review Applications</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">Project Management</h2>
                  <p className="text-sm text-gray-500">Manage community projects and initiatives</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Create Project
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Projects</CardTitle>
                    <CardDescription>Currently running projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Projects</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Analytics</CardTitle>
                    <CardDescription>Performance metrics and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Analytics</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Settings</CardTitle>
                    <CardDescription>General community configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full">Update Chat Settings</Button>
                    <Button variant="outline" className="w-full">Aravt Settings</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reward Settings</CardTitle>
                    <CardDescription>Configure reward distribution and validation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full">Reward Distribution</Button>
                    <Button variant="outline" className="w-full">Task Validation</Button>
                  </CardContent>
                </Card>
              </div>

              {userRank >= 2 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Advanced Settings Available</AlertTitle>
                  <AlertDescription>
                    As a higher-ranked leader, you have access to additional configuration options.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <TaskCreationModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};

export default AdminPanel;