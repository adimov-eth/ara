import React, { useState } from 'react';
import { Plus, ListChecks, Users, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";

const ProjectManagement = ({ userRank = 0 }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'DeFi Protocol',
      description: 'Building decentralized exchange platform',
      status: 'active',
      progress: 65,
      tasks: 8,
      members: 5,
      funding: '50000 USDT'
    },
    {
      id: 2,
      name: 'NFT Marketplace',
      description: 'Community-driven NFT trading platform',
      status: 'planning',
      progress: 20,
      tasks: 12,
      members: 3,
      funding: '30000 USDT'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const ProjectCard = ({ project }) => (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div>
                <ListChecks className="h-4 w-4 inline mr-1" />
                {project.tasks} tasks
              </div>
              <div>
                <Users className="h-4 w-4 inline mr-1" />
                {project.members} members
              </div>
              <div>
                <CreditCard className="h-4 w-4 inline mr-1" />
                {project.funding}
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-500">{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
            View Details
          </Button>
          <Button variant="outline" size="sm">Task Board</Button>
          {userRank > 0 && (
            <Button variant="outline" size="sm">Manage</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  const CreateProjectModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" placeholder="Enter project name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="funding">Initial Funding (USDT)</Label>
              <Input
                id="funding"
                type="number"
                placeholder="Enter amount"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="members">Initial Team Size</Label>
              <Input
                id="members"
                type="number"
                placeholder="Enter team size"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-500">Manage your Aravt projects</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <CreateProjectModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default ProjectManagement;