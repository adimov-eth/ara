import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useProjectsStore } from '@/store/projects';
import { Project } from "@/types";
import { CreateProjectDialog } from '@/components/CreateProjectDialog';

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {project.logo && (
              <img src={project.logo} alt={`${project.name} logo`} className="h-8 w-8 mr-2" />
            )}
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </div>
          </div>
          <Badge variant={project.Status === 'Posted' ? 'default' : 'secondary'}>
            {project.Status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              {project.fundings && (
                <div>
                  <CreditCard className="h-4 w-4 inline mr-1" />
                  {project.fundings.amount} {project.fundings.currency}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            View Details
          </Button>
          <Button variant="outline" size="sm">Task Board</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ProjectManagement = () => {
  const { user } = useAuthStore();
  const { projects, isLoading, error, fetchProjects } = useProjectsStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (!user || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-500">Manage your Aravt projects</p>
        </div>
        <CreateProjectDialog />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects?.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement; 