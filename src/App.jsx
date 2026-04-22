import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Timer from './components/timer/Timer'
import WeeklyCalendar from './components/calendar/WeeklyCalendar'
import TaskList from './components/tasks/TaskList'
import ProjectList from './components/projects/ProjectList'
import Analytics from './components/analytics/Analytics'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

const VIEWS = { timer: Timer, calendar: WeeklyCalendar, tasks: TaskList, projects: ProjectList, analytics: Analytics }

export default function App() {
  const [view, setView] = useState('timer')
  useKeyboardShortcuts(setView)

  const View = VIEWS[view]

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar view={view} setView={setView} />
      <main className="flex-1 overflow-hidden animate-fade-in">
        <View setView={setView} />
      </main>
    </div>
  )
}