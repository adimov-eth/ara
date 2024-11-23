import { create } from 'zustand'
import { Project } from '@/types'
import { api } from '@/lib/api'

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
 // createProject: (ProjectId: number, text: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
    //  const projects: Project[] = await api.get_project();
      const projects: Project[] = []
      set({ projects: projects, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch projects', isLoading: false });
    }
  }
})); 