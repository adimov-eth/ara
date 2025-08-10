import { useEffect, useState } from 'react';
import { 
  Bell, Settings, CreditCard, Star, Users, 
  Briefcase, ListTodo, ChevronRight, MessageCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useDashboardStore } from '@/store/dashboard';
import { useAuthStore } from '@/store/auth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import CreateAravtForm from '@/components/client/CreateAravtForm';
import { useAravtsStore } from '@/store/aravts';
import { Badge } from '@/components/ui/badge';

const StatCard = ({ title, value, icon: Icon, progress }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  progress?: number;
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      {progress !== undefined && (
        <Progress value={progress} className="h-1 mt-2" />
      )}
    </CardContent>
  </Card>
);

const ActivityFeed = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-4 text-sm">
        <div>
          <Avatar className="h-10 w-10">
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <p className="font-medium">New task completed</p>
          <p className="text-gray-500">User completed Task #123</p>
        </div>
        <span className="text-gray-400 text-xs">2h ago</span>
      </div>
    </CardContent>
  </Card>
);

const QuickActions = () => (
  /* To do
  <Card>
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <Button variant="outline">
        <span className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Manage Team
        </span>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button variant="outline">
        <span className="flex items-center">
          <ListTodo className="mr-2 h-4 w-4" />
          Create Task
        </span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
  */
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm">Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="space-y-1">
      <Button variant="outline" size="sm" className="w-full justify-start text-sm">
        <Users className="mr-2 h-3 w-3" />
        Manage Team
      </Button>
      <Button variant="outline" size="sm" className="w-full justify-start text-sm">
        <ListTodo className="mr-2 h-3 w-3" />
        Create Task
      </Button>
    </CardContent>
  </Card>
);

const AravtDashboard = () => {
  const { stats, isLoading: dashboardLoading, error: dashboardError, fetchDashboardData } = useDashboardStore();
  const { fetchAravtDetails, aravtDetails, isLoading: aravtLoading } = useAravtsStore();
  const user = useAuthStore(state => state.user);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    // Fetch aravt details if user is in an aravt
    if (user?.aravt?.id) {
      fetchAravtDetails(user.aravt.id);
    }
  }, [fetchDashboardData, fetchAravtDetails, user?.aravt_id]);

  if (dashboardLoading || aravtLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto py-4 px-3 space-y-4">
      <div className=" items-center">
        <div>
          <h1 className="text-2xl font-bold">{user?.aravt?.name} (№{user?.aravt?.id})</h1>
          <p className="text-gray-500"><b>{user?.username}</b> you are in the Aravt</p>
        </div>
        {/* <div className="flex gap-1">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div> */}
      </div>

      {dashboardError && (
        <Alert variant="destructive">
          <AlertDescription>{dashboardError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{aravtDetails?.description}</p>
          <div className="flex flex-wrap gap-1">
            {aravtDetails?.skills?.map((skill, i) => (
              <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {aravtDetails?.team?.map(member => (
              <div key={member.id} className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{member.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.username}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Leadership</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">{aravtDetails?.leader.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{aravtDetails?.leader.username}</p>
              <p className="text-xs text-muted-foreground">Aravt Leader</p>
            </div>
          </div>
        </CardContent>
      </Card>

      

      

      {aravtDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Aravt Business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            

            {aravtDetails.business?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Projects</h4>
                <div className="grid gap-2 mt-2">
                  {aravtDetails.business.map(project => (
                    <Card key={project.id} className="p-4">
                      <div className="">
                        <div>
                          <h5 className="font-medium">• {project.name}</h5>
                          <p className="text-sm pb-1 text-gray-500">{project.description}</p>
                        </div>
                        <Badge>{"Active"}</Badge>
                        {/* <Badge>{project.Status}</Badge> */}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {aravtDetails.offers?.length > 0 && (
              <div>
                <h4 className="pt-2 text-sm font-medium text-gray-500">Market Offers</h4>
                <div className="grid gap-2 mt-2">
                  {aravtDetails.offers.map(offer => (
                    <Card key={offer.id} className="p-4">
                      <div className="">
                        <div>
                          <h5 className="font-medium">{offer.name}</h5>
                          <p className="text-sm text-gray-500">{offer.description}</p>
                        </div>
                        <div className="text-center">
                          <div className="font-medium pt-2">{"$" + offer.price}</div>
                          {offer.is_limited && (
                            <div className="text-sm text-gray-500">
                              {offer.count_left} remaining
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {aravtDetails.telegram_chat_link && (
              <div>
                <h4 className="text-sm pt-2 font-medium text-gray-500">Telegram Chat</h4>
                <a 
                  href={aravtDetails.telegram_chat_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Open Telegram Chat
                </a>
              </div>
            )}

          </CardContent>
        </Card>
      )}

      

      <QuickActions />

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-1">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Tasks</p>
              <p className="text-lg font-semibold">{stats.tasksCompleted}/{stats.totalTasks}</p>
              <Progress value={(stats.tasksCompleted / stats.totalTasks) * 100} className="h-1 mt-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="text-lg font-semibold">Rank {stats.rank}</p>
              <Progress value={stats.rankProgress} className="h-1 mt-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tokens</p>
              <p className="text-lg font-semibold">{stats.tokensEarned} $aravt</p>
            </div>
          </div>
        </CardContent>
      </Card>

      

      {user?.able_to_create_aravt && (
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => setIsFormOpen(true)}
          className="w-full"
        >
          Create New Aravt
        </Button>
      )}

      {isFormOpen && <CreateAravtForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default AravtDashboard; 