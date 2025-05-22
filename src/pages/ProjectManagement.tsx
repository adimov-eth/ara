import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useProjectsStore } from '@/store/projects';
import { Project } from "@/types";
import { CreateProjectDialog } from '@/components/client/CreateProjectDialog';
import { useOffersStore } from '@/store/offers';

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const { offers } = useOffersStore();
  
  // Get offers count for this project
  const projectOffers = offers.filter(offer => offer.business.id === project.id);

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {project.logo && (
              <img src={project.logo} alt={`${project.name} logo`} className="h-8 w-8 mr-2" />
            )}
            <div>
              <CardTitle className="text-lg text-left">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </div>
          </div>
          <Badge variant={project.Status === 'Posted' ? 'default' : 'secondary'}>
            Active {project.Status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              {project.fundings && (
                <div>
                  <Banknote className="h-4 w-4 inline mr-1" />
                  Fundings: {project.fundings} USD
                </div>
              )}
              <div>
                {/* <Badge variant="secondary">
                  
                </Badge> */}
              </div>
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
            Details
            
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/offers?projectId=${project.id}`)}
          >
            Market Offers: {projectOffers.length} 
          </Button>

          

          <Button variant="outline" disabled size="sm">Project Tasks</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ProjectManagement = () => {
  const navigate = useNavigate();
  const { user, aravt } = useAuthStore();
  const { projects, isLoading, error, fetchProjectsForAravt } = useProjectsStore();

  useEffect(() => {
    if (!user || !user.aravt?.id) {
      navigate('/login');
      return;
    }
    fetchProjectsForAravt(user?.aravt?.id);
  }, [user, fetchProjectsForAravt, navigate]);

  if (!user || !aravt || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-left font-bold">Projects</h1>
          <p className="text-gray-500">Business of Aravt</p>
        </div>
        <CreateProjectDialog aravt_id={aravt.id}/>
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