import { create } from 'zustand'
import { Project } from '@/types'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { Aravt } from '@/types'

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (project: Omit<Project, 'id'>) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set, get) => {
  const aravt = useAuthStore.getState().aravt as Aravt;

  return {
    projects: [],
    isLoading: false,
    error: null,
    fetchProjects: async () => {
      set({ isLoading: true, error: null });
      try {
        const user_aravt = await api.aravt_aravt(aravt.id);
        const projects: Project[] = user_aravt.business;
        set({ projects: projects, isLoading: false });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : 'Failed to fetch projects', isLoading: false });
      }
    },
    createProject: async (project: Omit<Project, 'id'>) => {
      set({ isLoading: true, error: null });
      try {
        await api.aravt_set_business(project);
        await get().fetchProjects();
        set({ isLoading: false });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : 'Failed to create project', isLoading: false });
      }
    }
  }
}); 