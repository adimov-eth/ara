import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types';
import { useUserStore } from '@/store/user';

interface MemberCardProps {
  isLeader: boolean;
  member: User;
  onUpdateRole: (userId: number, role: User['role']) => void;
  onRemoveMember: (userId: number) => void;
  isLoading?: boolean;
}

export const MemberCard = ({ isLeader, member, onUpdateRole, onRemoveMember, isLoading }: MemberCardProps) => {
  const { letUserCreateAravt } = useUserStore();
  // Handler for updating the ability to create Aravt
  const handleAravtChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    try {
      await letUserCreateAravt(member.id); // Update API call
      // Optionally, you can also update the local state or trigger a refetch
    } catch (error) {
      console.error("Failed to update Aravt permission", error);
    }
  };

  // Handler for updating the ability to create tasks
  const handleTasksChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    try {
      // await api.updateUserPermissions(member.id, { able_to_create_tasks: newValue }); // Update API call
      // Optionally, you can also update the local state or trigger a refetch
    } catch (error) {
      console.error("Failed to update Tasks permission", error);
    }
  };
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {member.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-lg flex items-center gap-2">
                {member.username}
                <Badge variant={
                  member.role === 'SuperAdmin' ? 'destructive' : 
                  member.role === 'AravtLeader' ? 'default' : 
                  'secondary'
                }>
                  {member.role}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">{member.email}</div>
              {member.city && (
                <div className="text-sm text-muted-foreground mt-1">{member.city}</div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          {isLeader && (
            <>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={member.able_to_create_aravt} 
                  onChange={handleAravtChange} 
                  disabled={isLoading}
                />
                <label className="ml-2">Can Create Aravt</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={member.able_to_create_tasks} 
                  onChange={handleTasksChange} 
                  disabled={isLoading}
                />
                <label className="ml-2">Can Create Tasks</label>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm font-medium">Tasks</div>
            <div className="text-2xl font-bold">{member.tasksCompleted}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Rating</div>
            <div className="text-2xl font-bold">{member.rating}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Success Rate</div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{member.completionRate}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Tokens</div>
            <div className="text-2xl font-bold">{member.tokenBalance}</div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Select 
            defaultValue={member.role}
            onValueChange={(value: User['role']) => onUpdateRole(member.id, value)}
            disabled={isLoading}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="AravtLeader">Aravt Leader</SelectItem>
              <SelectItem value="SuperAdmin">Super Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-red-500 hover:text-red-600"
            onClick={() => onRemoveMember(member.id)}
            disabled={isLoading}
          >
            Remove Member
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 