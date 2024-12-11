import { create } from 'zustand'
import { api } from '@/lib/api'
import { Task } from '@/types'

interface TasksState {
  localTasks: Task[];
  globalTasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasksData: () => Promise<void>;
  updateTaskIsDone: (taskId: number, is_done: boolean) => Promise<void>;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  localTasks: [],
  globalTasks: [],
  isLoading: false,
  error: null,

  fetchTasksData: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks: Task[] = await api.tasks_get_tasks();
      
      const LocalTasks: Task[] = tasks.filter((task) => !task.is_global);

      const GlobalTasks: Task[] = tasks.filter((task) => task.is_global);

      set({ 
        localTasks: LocalTasks,
        globalTasks: GlobalTasks,
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

  updateTaskIsDone: async (taskId: number, is_done: boolean) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const state = get();
      const updateTasks = (tasks: Task[]) =>
        tasks.map(task =>
          task.id === taskId ? { ...task, is_done } : task
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
        set({ error: 'Failed to update task completion', isLoading: false });
      }
    }
  },
})); 