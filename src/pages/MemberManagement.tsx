import { useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/auth';
import { useAdminStore } from '@/store/admin';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MemberCard } from '@/components/admin/MemberCard';

const MemberManagement = () => {
  const { user } = useAuthStore();
  const { 
    members, 
    isLoading, 
    error, 
    fetchAdminData,
    updateMemberRole,
    removeMember 
  } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-gray-500">Manage community members</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Members Management</CardTitle>
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
                member={member}
                onUpdateRole={updateMemberRole}
                onRemoveMember={removeMember}
                isLoading={isLoading}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberManagement; 