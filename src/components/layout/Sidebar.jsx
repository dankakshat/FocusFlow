import { Timer, Calendar, CheckSquare, FolderOpen, BarChart2, Zap } from 'lucide-react'

const NAV = [
  { id: 'timer',     icon: Timer,       label: 'Timer',     shortcut: '1' },
  { id: 'calendar',  icon: Calendar,    label: 'Calendar',  shortcut: '2' },
  { id: 'tasks',     icon: CheckSquare, label: 'Tasks',     shortcut: '3' },
  { id: 'projects',  icon: FolderOpen,  label: 'Projects',  shortcut: '4' },
  { id: 'analytics', icon: BarChart2,   label: 'Analytics', shortcut: '5' },
]

export default function Sidebar({ view, setView }) {
  return (
    <aside className="w-56 shrink-0 flex flex-col h-screen bg-surface-1 border-r border-surface-3 py-6 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
          <Zap size={14} className="text-white" />
        </div>
        <span className="font-semibold text-primary tracking-tight">FocusFlow</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ id, icon: Icon, label, shortcut }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`
              group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
              ${view === id
                ? 'bg-accent/15 text-accent'
                : 'text-subtle hover:bg-surface-3 hover:text-primary'}
            `}
          >
            <Icon size={16} />
            <span className="flex-1 text-left">{label}</span>
            <kbd className="hidden group-hover:inline text-[10px] text-muted bg-surface-4 px-1.5 py-0.5 rounded font-mono">
              {shortcut}
            </kbd>
          </button>
        ))}
      </nav>

      {/* Shortcut hint */}
      <p className="px-3 text-[11px] text-muted leading-relaxed">
        <kbd className="bg-surface-4 px-1 rounded font-mono">Space</kbd> start/pause<br/>
        <kbd className="bg-surface-4 px-1 rounded font-mono">R</kbd> reset timer
      </p>
    </aside>
  )
}