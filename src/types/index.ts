export interface User {
  id: number;
  username: string;
  email?: string;
  role: 'User' | 'AravtLeader' | 'SuperAdmin';
  aravt_id?: number;
}

export interface Aravt {
  id: number;
  name: string;
  description: string;
  capacity: {
    current: number;
    max: number;
  };
  leader: string;
  skills: string[];
  logo?: string;
}

export interface Feature {
  id: number;
  type: 'community' | 'tasks' | 'rewards';
  title: string;
  description: string;
  badge: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive';
}

export interface ExtendedUser extends User {
    tasksCompleted: number;
    rating: number;
    completionRate: number;
    city?: string;
    tokenBalance: number;
  }

  export interface Task {
    id: number;
    title: string;
    description: string;
    reward: number;
    rewardType: 'AT' | 'USDT';
    deadline: string;
    status: 'open' | 'in_progress' | 'completed';
    assignees: User[];
    progress: number;
    isGlobal: boolean;
    priority?: 'low' | 'medium' | 'high';
  }