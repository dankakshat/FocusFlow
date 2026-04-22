import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) => set((s) => ({
        tasks: [...s.tasks, {
          id: crypto.randomUUID(),
          title: task.title || 'Untitled',
          duration: task.duration || 25,       // minutes
          tag: task.tag || 'General',
          projectId: task.projectId || null,
          completed: false,
          createdAt: new Date().toISOString(),
          ...task,
        }]
      })),

      updateTask: (id, patch) => set((s) => ({
        tasks: s.tasks.map(t => t.id === id ? { ...t, ...patch } : t)
      })),

      deleteTask: (id) => set((s) => ({
        tasks: s.tasks.filter(t => t.id !== id)
      })),

      toggleTask: (id) => set((s) => ({
        tasks: s.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),

      getByProject: (projectId) => get().tasks.filter(t => t.projectId === projectId),
    }),
    { name: 'focusflow-tasks' }
  )
)

export default useTaskStore