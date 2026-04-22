import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCalendarStore = create(
  persist(
    (set) => ({
      // calendarTasks: { 'YYYY-MM-DD': [ { id, title, startHour, duration, color } ] }
      calendarTasks: {},

      addCalendarTask: (dateKey, task) => set((s) => ({
        calendarTasks: {
          ...s.calendarTasks,
          [dateKey]: [...(s.calendarTasks[dateKey] || []), {
            id: crypto.randomUUID(),
            title: task.title || 'Block',
            startHour: task.startHour ?? 9,
            duration: task.duration ?? 1,   // hours
            color: task.color || '#7c6ff7',
            ...task,
          }]
        }
      })),

      updateCalendarTask: (dateKey, id, patch) => set((s) => ({
        calendarTasks: {
          ...s.calendarTasks,
          [dateKey]: (s.calendarTasks[dateKey] || []).map(t => t.id === id ? { ...t, ...patch } : t)
        }
      })),

      deleteCalendarTask: (dateKey, id) => set((s) => ({
        calendarTasks: {
          ...s.calendarTasks,
          [dateKey]: (s.calendarTasks[dateKey] || []).filter(t => t.id !== id)
        }
      })),
    }),
    { name: 'focusflow-calendar' }
  )
)

export default useCalendarStore