import { create } from 'zustand'
import { type User } from '@/types'

interface DashboardStats {
  tasksCompleted: number;
  totalTasks: number;
  tokensEarned: number;
  usdtEarned: number;
  rank: number;
  rankProgress: number;
}

interface Task {
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
}

interface DashboardState {
  stats: DashboardStats;
  localTasks: Task[];
  globalTasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  updateTaskProgress: (taskId: number, progress: number) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: {
    tasksCompleted: 12,
    totalTasks: 15,
    tokensEarned: 2450,
    usdtEarned: 1200,
    rank: 2,
    rankProgress: 65,
  },
  localTasks: [],
  globalTasks: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLocalTasks: Task[] = [
        {
          id: 1,
          title: 'Website Development',
          description: 'Create landing page for new project',
          reward: 500,
          rewardType: 'USDT',
          deadline: '2024-11-20',
          status: 'in_progress',
          assignees: [],
          progress: 60,
          isGlobal: false,
        },
        {
          id: 2,
          title: 'Smart Contract Audit',
          description: 'Security audit for token contract',
          reward: 1000,
          rewardType: 'AT',
          deadline: '2024-11-25',
          status: 'open',
          assignees: [],
          progress: 0,
          isGlobal: false,
        },
      ];

      const mockGlobalTasks: Task[] = [
        {
          id: 3,
          title: 'Network Enhancement',
          description: 'Improve cross-aravt communication protocol',
          reward: 2000,
          rewardType: 'AT',
          deadline: '2024-12-01',
          status: 'open',
          assignees: [],
          progress: 30,
          isGlobal: true,
        },
      ];

      set({ 
        localTasks: mockLocalTasks,
        globalTasks: mockGlobalTasks,
        isLoading: false 
      });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Failed to fetch dashboard data', isLoading: false });
      }
    }
  },

  updateTaskProgress: async (taskId: number, progress: number) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const state = get();
      const updateTasks = (tasks: Task[]) =>
        tasks.map(task =>
          task.id === taskId ? { ...task, progress } : task
        );

      set({
        localTasks: updateTasks(state.localTasks),
        globalTasks: updateTasks(state.globalTasks),
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Failed to update task progress', isLoading: false });
      }
    }
  },
})); 