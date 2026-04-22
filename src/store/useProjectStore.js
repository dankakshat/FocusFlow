import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const COLORS = ['#7c6ff7','#34d399','#fbbf24','#f87171','#60a5fa','#a78bfa','#fb7185']

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,

      addProject: (name) => set((s) => ({
        projects: [...s.projects, {
          id: crypto.randomUUID(),
          name,
          color: COLORS[s.projects.length % COLORS.length],
          createdAt: new Date().toISOString(),
        }]
      })),

      updateProject: (id, patch) => set((s) => ({
        projects: s.projects.map(p => p.id === id ? { ...p, ...patch } : p)
      })),

      deleteProject: (id) => set((s) => ({
        projects: s.projects.filter(p => p.id !== id),
        activeProjectId: s.activeProjectId === id ? null : s.activeProjectId,
      })),

      setActiveProject: (id) => set({ activeProjectId: id }),
      getById: (id) => get().projects.find(p => p.id === id),
    }),
    { name: 'focusflow-projects' }
  )
)

export default useProjectStore