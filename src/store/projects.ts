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
  createProject: (_project: Project) => Promise<void>;
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
        const projects: Project[] = user_aravt.business
        set({ projects: projects, isLoading: false });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : 'Failed to fetch projects', isLoading: false });
      }
    },
    createProject: async (_project: Project) => {
      set({ isLoading: true, error: null });
      try {
        await api.aravt_set_business(_project);
        
        set({ projects: [...get().projects, _project], isLoading: false });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : 'Failed to create project', isLoading: false });
      }
    }
  }
}); 