import React, { useState } from 'react';
import {
  Plus, ListChecks, Star, Search, Filter, ChevronDown, Users, Shield, Activity, Wallet
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

const MemberManagement = ({ isLeader = false }) => {
  const [activeView, setActiveView] = useState('members');
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Alex Chen',
      username: '@alexchen',
      role: 'Leader',
      status: 'online',
      tasksCompleted: 24,
      rating: 4.8,
      joined: '2024-09-01',
      avatar: null,
      completionRate: 92,
      city: 'Singapore',
      email: 'alex@example.com',
      able_to_create_tasks: true,
      is_leader_of_aravt: true,
      tokenBalance: 2500,
    },
    {
      id: 2,
      name: 'Maria Garcia',
      username: '@mgarcia',
      role: 'Member',
      status: 'offline',
      tasksCompleted: 18,
      rating: 4.5,
      joined: '2024-10-15',
      avatar: null,
      completionRate: 85,
      city: 'Barcelona',
      email: 'maria@example.com',
      able_to_create_tasks: false,
      is_leader_of_aravt: false,
      tokenBalance: 1200,
    },
    {
      id: 3,
      name: 'John Smith',
      username: '@jsmith',
      role: 'Member',
      status: 'online',
      tasksCompleted: 15,
      rating: 4.2,
      joined: '2024-10-20',
      avatar: null,
      completionRate: 78,
      city: 'London',
      email: 'john@example.com',
      able_to_create_tasks: true,
      is_leader_of_aravt: false,
      tokenBalance: 800,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isManageMemberModalOpen, setIsManageMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const pendingRequests = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sjohnson',
      email: 'sarah@example.com',
      skills: ['Smart Contracts', 'DeFi'],
      applicationDate: '2024-11-08',
      city: 'New York',
      rating: 4.3,
      referredBy: 'Alex Chen',
    },
    {
      id: 2,
      name: 'David Lee',
      username: '@dlee',
      email: 'david@example.com',
      skills: ['Frontend', 'UI/UX'],
      applicationDate: '2024-11-09',
      city: 'Seoul',
      rating: 4.1,
      referredBy: 'Maria Garcia',
    },
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesRole;
  });

  const CommunityStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-2xl font-bold">{members.length}/10</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-2xl font-bold">
              {members.filter((m) => m.status === 'online').length}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Task Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-2xl font-bold">
              {members.filter((m) => m.able_to_create_tasks).length}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-2xl font-bold">
              {members.reduce((sum, m) => sum + m.tokenBalance, 0)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MemberCard = ({ member }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="text-lg">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-lg flex items-center gap-2">
                {member.name}
                {member.role === 'Leader' && <Badge variant="secondary">Leader</Badge>}
              </div>
              <div className="text-sm text-muted-foreground">{member.username}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={member.status === 'online' ? 'default' : 'outline'}
                  className="h-5"
                >
                  {member.status}
                </Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{member.city}</span>
              </div>
            </div>
          </div>
          {isLeader && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedMember(member);
                setIsManageMemberModalOpen(true);
              }}
            >
              Manage
            </Button>
          )}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm font-medium">Tasks</div>
            <div className="text-2xl font-bold">{member.tasksCompleted}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Rating</div>
            <div className="text-2xl font-bold flex items-center">
              {member.rating}
              <Star className="h-4 w-4 ml-1 text-yellow-500" />
            </div>
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

  const ManageMemberModal = ({ isOpen, onClose, member }) => {
    if (!member) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Member - {member.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Role</Label>
                <Select defaultValue={member.role.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="leader">Leader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select defaultValue={member.able_to_create_tasks ? 'enabled' : 'disabled'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Task Creation Enabled</SelectItem>
                    <SelectItem value="disabled">Task Creation Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button variant="outline" size="sm">
                  Reset Password
                </Button>
                <Button variant="outline" size="sm">
                  Transfer Tokens
                </Button>
                <Button variant="outline" size="sm">
                  View Activity Log
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  Remove Member
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const InviteMemberModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Invite New Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email Address</Label>
              <Input placeholder="Enter email address" type="email" />
            </div>
            <div>
              <Label>Role</Label>
              <Select defaultValue="member">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="createTasks" className="w-4 h-4" />
                <Label htmlFor="createTasks">Can Create Tasks</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="manageProjects" className="w-4 h-4" />
                <Label htmlFor="manageProjects">Can Manage Projects</Label>
              </div>
            </div>
          </div>
          <div>
            <Label>Welcome Message</Label>
            <textarea
              className="w-full mt-2 p-2 border rounded-md"
              rows={3}
              placeholder="Enter a welcome message for the new member"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const RequestCard = ({ request }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {request.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{request.name}</div>
              <div className="text-sm text-muted-foreground">{request.username}</div>
              <div className="text-sm text-muted-foreground">{request.email}</div>
              <div className="flex gap-2 mt-2">
                {request.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-right mb-2">
              <span className="text-muted-foreground">Referred by: </span>
              {request.referredBy}
            </div>
            <div className="flex gap-2">
              <Button size="sm">Accept</Button>
              <Button variant="outline" size="sm">
                Decline
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-muted-foreground">Manage your Aravt community members</p>
        </div>
        {isLeader && (
          <Button onClick={() => setIsInviteModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      <CommunityStats />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-8 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="leader">Leaders</SelectItem>
                  <SelectItem value="member">Members</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="members">
            <TabsList>
              <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
              {isLeader && (
                <TabsTrigger value="requests">
                  Pending Requests ({pendingRequests.length})
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="members" className="mt-6">
              <div className="grid grid-cols-1 gap-4">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            {isLeader && (
              <TabsContent value="requests" className="mt-6">
                {pendingRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <ManageMemberModal
        isOpen={isManageMemberModalOpen}
        onClose={() => setIsManageMemberModalOpen(false)}
        member={selectedMember}
      />
    </div>
  );
};

export default MemberManagement;