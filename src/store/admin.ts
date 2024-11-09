import { create } from 'zustand'
import { type User, type Task, type Aravt, ExtendedUser } from '@/types'

interface AdminStats {
  totalMembers: number;
  activeTasks: number;
  taskCompletion: number;
  averageRating: number;
  totalRewards: string;
  pendingRequests: number;
}

interface JoinRequest {
  id: number;
  user: {
    name: string;
    username: string;
    email: string;
    skills: string[];
    referredBy: string;
  };
  applicationDate: string;
}

export interface AdminTask extends Task {
  assignedTo?: string[];
  priority: 'low' | 'medium' | 'high';
}

interface AravtSettings {
  name: string;
  description: string;
  telegramLink?: string;
  maxMembers: number;
  taskSettings: {
    requireApproval: boolean;
    minReward: number;
    maxReward: number;
    defaultRewardType: 'AT' | 'USDT';
  };
  memberSettings: {
    allowSelfJoin: boolean;
    requireKYC: boolean;
    minRating: number;
  };
}

interface AdminState {
  stats: AdminStats;
  members: ExtendedUser[];
  pendingRequests: JoinRequest[];
  tasks: AdminTask[];
  aravt: Aravt | null;
  isLoading: boolean;
  error: string | null;
  fetchAdminData: () => Promise<void>;
  approveRequest: (requestId: number) => Promise<void>;
  rejectRequest: (requestId: number) => Promise<void>;
  updateMemberRole: (userId: number, role: User['role']) => Promise<void>;
  removeMember: (userId: number) => Promise<void>;
  createTask: (task: Omit<AdminTask, 'id'>) => Promise<void>;
  updateTask: (taskId: number, updates: Partial<AdminTask>) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  settings: AravtSettings;
  updateSettings: (updates: Partial<AravtSettings>) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: {
    totalMembers: 25,
    activeTasks: 12,
    taskCompletion: 85,
    averageRating: 4.7,
    totalRewards: '25,000 USDT',
    pendingRequests: 3,
  },
  members: [],
  pendingRequests: [],
  tasks: [
    {
      id: 1,
      title: 'Smart Contract Development',
      description: 'Develop and test token staking smart contract',
      reward: 1500,
      rewardType: 'USDT',
      deadline: '2024-12-01',
      status: 'in_progress',
      assignees: [],
      progress: 65,
      isGlobal: false,
      priority: 'high',
      assignedTo: ['John D.', 'Sarah M.'],
    },
    // Add more mock tasks as needed
  ],
  aravt: null,
  isLoading: false,
  error: null,
  settings: {
    name: 'ARAVT SYSTEMS',
    description: 'Founders Aravt',
    telegramLink: 'https://t.me/aravtsystems',
    maxMembers: 100,
    taskSettings: {
      requireApproval: true,
      minReward: 100,
      maxReward: 10000,
      defaultRewardType: 'AT',
    },
    memberSettings: {
      allowSelfJoin: false,
      requireKYC: true,
      minRating: 4.0,
    },
  },

  fetchAdminData: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockPendingRequests: JoinRequest[] = [
        {
          id: 1,
          user: {
            name: 'Sarah Johnson',
            username: '@sjohnson',
            email: 'sarah@example.com',
            skills: ['Smart Contracts', 'DeFi'],
            referredBy: 'Alex Chen',
          },
          applicationDate: '2024-11-08',
        },
        {
          id: 2,
          user: {
            name: 'David Lee',
            username: '@dlee',
            email: 'david@example.com',
            skills: ['Frontend', 'UI/UX'],
            referredBy: 'Maria Garcia',
          },
          applicationDate: '2024-11-09',
        },
      ];

      const mockMembers = [
        {
          id: 1,
          username: 'alexchen',
          email: 'alex@example.com',
          role: 'AravtLeader' as const,
          tasksCompleted: 24,
          rating: 4.8,
          completionRate: 92,
          city: 'Singapore',
          tokenBalance: 2500,
        },
        {
          id: 2,
          username: 'mgarcia',
          email: 'maria@example.com',
          role: 'User' as const,
          tasksCompleted: 18,
          rating: 4.5,
          completionRate: 85,
          city: 'Barcelona',
          tokenBalance: 1200,
        },
      ];

      set({ 
        pendingRequests: mockPendingRequests,
        members: mockMembers,
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch admin data', 
        isLoading: false 
      });
    }
  },

  approveRequest: async (requestId: number) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const state = get();
      const updatedRequests = state.pendingRequests.filter(req => req.id !== requestId);
      set({ 
        pendingRequests: updatedRequests,
        stats: {
          ...state.stats,
          pendingRequests: state.stats.pendingRequests - 1,
          totalMembers: state.stats.totalMembers + 1,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to approve request', 
        isLoading: false 
      });
    }
  },

  rejectRequest: async (requestId: number) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const state = get();
      const updatedRequests = state.pendingRequests.filter(req => req.id !== requestId);
      set({ 
        pendingRequests: updatedRequests,
        stats: {
          ...state.stats,
          pendingRequests: state.stats.pendingRequests - 1,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to reject request', 
        isLoading: false 
      });
    }
  },

  updateMemberRole: async (userId: number, role: User['role']) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const state = get();
      const updatedMembers = state.members.map(member =>
        member.id === userId ? { ...member, role } : member
      );
      set({ members: updatedMembers, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update member role', 
        isLoading: false 
      });
    }
  },

  removeMember: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const state = get();
      const updatedMembers = state.members.filter(member => member.id !== userId);
      set({ 
        members: updatedMembers,
        stats: {
          ...state.stats,
          totalMembers: state.stats.totalMembers - 1,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to remove member', 
        isLoading: false 
      });
    }
  },

  createTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTask = {
        ...task,
        id: Math.max(0, ...get().tasks.map(t => t.id)) + 1,
      };
      
      set(state => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create task', 
        isLoading: false 
      });
    }
  },

  updateTask: async (taskId, updates) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update task', 
        isLoading: false 
      });
    }
  },

  deleteTask: async (taskId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete task', 
        isLoading: false 
      });
    }
  },

  updateSettings: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        settings: {
          ...state.settings,
          ...updates,
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update settings', 
        isLoading: false 
      });
    }
  },
})); 