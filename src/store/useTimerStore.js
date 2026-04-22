import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { todayKey } from '../utils/time'

const useTimerStore = create(
  persist(
    (set, get) => ({
      seconds: 0,
      running: false,
      taskName: '',
      sessions: [],        // { id, date, duration, taskName, startedAt }
      _intervalId: null,

      setTaskName: (name) => set({ taskName: name }),

      start: () => {
        if (get().running) return
        const id = setInterval(() => {
          set((s) => ({ seconds: s.seconds + 1 }))
        }, 1000)
        set({ running: true, _intervalId: id })
      },

      pause: () => {
        const { _intervalId } = get()
        if (_intervalId) clearInterval(_intervalId)
        set({ running: false, _intervalId: null })
      },

      reset: () => {
        const { _intervalId, seconds, taskName } = get()
        if (_intervalId) clearInterval(_intervalId)
        // Save session if it ran for at least 10s
        if (seconds >= 10) {
          set((s) => ({
            sessions: [...s.sessions, {
              id: crypto.randomUUID(),
              date: todayKey(),
              duration: s.seconds,
              taskName: s.taskName || 'Focus Session',
              startedAt: new Date().toISOString(),
            }]
          }))
        }
        set({ seconds: 0, running: false, _intervalId: null })
      },

      // Total seconds tracked on a given dateKey
      totalForDate: (dateKey) => {
        return get().sessions
          .filter(s => s.date === dateKey)
          .reduce((sum, s) => sum + s.duration, 0)
      },

      // Sessions for the last 7 days grouped by date
      weeklyData: () => {
        const sessions = get().sessions
        const result = {}
        for (let i = 6; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
          result[key] = sessions.filter(s => s.date === key).reduce((sum, s) => sum + s.duration, 0)
        }
        return result
      },
    }),
    {
      name: 'focusflow-timer',
      // Don't persist the interval id
      partialize: (s) => ({ sessions: s.sessions, taskName: s.taskName }),
    }
  )
)

export default useTimerStore