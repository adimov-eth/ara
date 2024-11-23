import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types';

interface MemberCardProps {
  member: User;
  onUpdateRole: (userId: number, role: User['role']) => void;
  onRemoveMember: (userId: number) => void;
  isLoading?: boolean;
}

export const MemberCard = ({ member, onUpdateRole, onRemoveMember, isLoading }: MemberCardProps) => (
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
        <div className="space-y-2">
          <Select 
            defaultValue={member.role}
            onValueChange={(value: User['role']) => onUpdateRole(member.id, value)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px]">
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
              <span className="text-2xl font-bold">{member.completionRate}%</span>
            </div>
            <Progress value={member.completionRate} className="mt-2" />
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">Tokens</div>
          <div className="text-2xl font-bold">{member.tokenBalance}</div>
        </div>
      </div>
    </CardContent>
  </Card>
); 