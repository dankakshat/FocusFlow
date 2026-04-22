import { useEffect } from 'react'
import useTimerStore from '../store/useTimerStore'

// Global keyboard shortcuts
// Space → start/pause timer
// R     → reset timer
export const useKeyboardShortcuts = (setView) => {
  const { running, start, pause, reset } = useTimerStore()

  useEffect(() => {
    const handler = (e) => {
      // Ignore when typing in inputs
      if (['INPUT','TEXTAREA'].includes(e.target.tagName)) return

      if (e.code === 'Space') {
        e.preventDefault()
        running ? pause() : start()
      }
      if (e.key === 'r' || e.key === 'R') reset()
      if (e.key === '1') setView('timer')
      if (e.key === '2') setView('calendar')
      if (e.key === '3') setView('tasks')
      if (e.key === '4') setView('projects')
      if (e.key === '5') setView('analytics')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [running, start, pause, reset, setView])
}