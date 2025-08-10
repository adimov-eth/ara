import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/auth';
import { useAdminStore } from '@/store/admin';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MemberCard } from '@/components/admin/MemberCard';
import { RequestCard } from '@/components/admin/RequestCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';

const MemberManagement = () => {
  const { user } = useAuthStore(); 
  
  const { 
    members, 
    pendingRequests, 
    isLoading, 
    error, 
    fetchAravtData,
    fetchAdminData,
    updateMemberRole,
    removeMember,
    approveRequest,
    rejectRequest,
    inviteMember
  } = useAdminStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    setIsInviting(true);
    try {
      await inviteMember(email);
      setEmail('');
      setDialogOpen(false);
      toast.info('Please send the invitation email in your email client');
    } catch (error) {
      // Error is handled in the store
    } finally {
      setIsInviting(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  useEffect(() => {
    fetchAravtData();
  }, [fetchAravtData]);

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="">
        <div>
          <h1 className="text-2xl font-bold">Aravt Members</h1>
          <p className="text-gray-500 mb-2 ">Manage the Team of Aravt</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite New Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address to send invite:</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isInviting}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isInviting}
              >
                {isInviting ? (
                  <div className="mr-2">
                    <LoadingSpinner/>
                    Sending Invitation...
                  </div>
                ) : (
                  'Send Invitation'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      

      <Card>
        <CardHeader>
          {/* <CardTitle>Aravt Management</CardTitle> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search members..." 
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
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="SuperAdmin">Super Admin</SelectItem>
                  <SelectItem value="AravtLeader">Aravt Leader</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                isLeader={user?.is_leader_of_aravt}
                member={member}
                onUpdateRole={updateMemberRole}
                onRemoveMember={removeMember}
                isLoading={isLoading}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requests to Join your Aravt:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingRequests.map((application) => (
            <RequestCard
              key={application.id}
              request={application}
              onApprove={approveRequest}
              onReject={rejectRequest}
              isLoading={isLoading}
            />
          ))}
        </CardContent>
      </Card>

      
    </div>
  );
};

export default MemberManagement; 