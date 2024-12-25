import { create } from 'zustand'
import { User, Task, Aravt, JoinRequest } from '@/types'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'

interface AdminStats {
  totalMembers: number;
  activeTasks: number;
  taskCompletion: number;
  averageRating: number;
  totalRewards: string;
  pendingRequests: number;
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
  members: User[];
  pendingRequests: JoinRequest[];
  tasks: Task[];
  aravt: Aravt | null;
  isLoading: boolean;
  error: string | null;
  fetchAdminData: () => Promise<void>;
  fetchAravtData: () => Promise<void>;
  approveRequest: (requestId: number) => Promise<void>;
  rejectRequest: (requestId: number) => Promise<void>;
  updateMemberRole: (userId: number, role: User['role']) => Promise<void>;
  removeMember: (userId: number) => Promise<void>;
  createTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (taskId: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  settings: AravtSettings;
  updateSettings: (updates: Partial<AravtSettings>) => Promise<void>;
  inviteMember: (email: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>()((set, get) => {
  const aravt = useAuthStore.getState().aravt as Aravt; // Access aravt from the store without using a hook
  const user = useAuthStore.getState().user as User;

  return {
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
    tasks: [],
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

        if (user.is_leader_of_aravt) {
          const PendingRequests: JoinRequest[] = await api.aravt_applications()
          set({ 
            pendingRequests: PendingRequests,
            isLoading: false,
          });
        } else {
          set({ 
            pendingRequests: [],
            isLoading: false,
          });
        }
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch admin data', 
          isLoading: false 
        });
      }
    },

    fetchAravtData: async () => {
      set({ isLoading: true, error: null });
      try {
        const user_aravt = await api.aravt_aravt(aravt.id)
        const Aravt_Members: User[] = [user_aravt.leader, ...user_aravt.team]
        const Members: User[] = await Promise.all(Aravt_Members.map(async member => {
          const user = await api.users_user(member.id)          
          return user
        }))

        set({ 
          members: Members,
          aravt: user_aravt,
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
        await api.aravt_applications_approve(requestId)
        
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
        await api.aravt_applications_reject(requestId)
        
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
        await api.tasks_set_task(task)

        let all_tasks = await api.tasks_get_tasks();
        // TODO:
        let other_tasks = all_tasks.other_tasks;
        let parent_tasks = all_tasks.parent_tasks;

        const tasks = all_tasks.tasks;
        
        set({
          tasks: tasks,
          isLoading: false,
        });
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

    inviteMember: async (email: string) => {
      try {
        set({ isLoading: true, error: null });
        await api.aravt_members_invite(email);
        // Refresh member list
        get().fetchAdminData();
      } catch (error) {
        set({ error: 'Failed to invite member' });
      } finally {
        set({ isLoading: false });
      }
    },
  }
}); 