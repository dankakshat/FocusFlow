import { useState } from 'react'
import { Play, Pause, RotateCcw, Plus } from 'lucide-react'
import useTimerStore from '../../store/useTimerStore'
import { formatTime, formatDuration, todayKey } from '../../utils/time'
import Button from '../ui/Button'
import SessionLog from './SessionLog'

const RADIUS = 90
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const MAX_SESSION = 90 * 60 // 90 min visual max

export default function Timer() {
  const { seconds, running, taskName, start, pause, reset, setTaskName, totalForDate } = useTimerStore()
  const [editingTask, setEditingTask] = useState(false)

  const progress = Math.min(seconds / MAX_SESSION, 1)
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const todayTotal = totalForDate(todayKey())

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center gap-10 py-12">

        {/* Task name */}
        <div className="text-center">
          {editingTask ? (
            <input
              autoFocus
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              onBlur={() => setEditingTask(false)}
              onKeyDown={e => e.key === 'Enter' && setEditingTask(false)}
              placeholder="What are you working on?"
              className="bg-transparent border-b border-accent text-center text-lg text-primary placeholder:text-muted focus:outline-none w-64 pb-1"
            />
          ) : (
            <button
              onClick={() => setEditingTask(true)}
              className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors"
            >
              <span className="text-lg font-light">{taskName || 'Click to set task name'}</span>
              <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>

        {/* SVG ring timer */}
        <div className="relative">
          <svg width="220" height="220" className={running ? 'ring-active' : ''}>
            {/* Background ring */}
            <circle cx="110" cy="110" r={RADIUS} fill="none" stroke="#1c1c1f" strokeWidth="8" />
            {/* Progress ring */}
            <circle
              cx="110" cy="110" r={RADIUS}
              fill="none"
              stroke={running ? '#7c6ff7' : '#3d3a6b'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 110 110)"
              style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
            />
          </svg>
          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-4xl font-light text-primary tracking-widest">
              {formatTime(seconds)}
            </span>
            <span className="text-xs text-muted mt-1">
              {running ? '● RUNNING' : seconds > 0 ? '⏸ PAUSED' : 'READY'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="md" onClick={reset} disabled={seconds === 0}>
            <RotateCcw size={15} />
            Reset
          </Button>
          <Button
            size="lg"
            onClick={running ? pause : start}
            className="min-w-[120px] justify-center"
          >
            {running ? <><Pause size={16} />Pause</> : <><Play size={16} />Start</>}
          </Button>
        </div>

        {/* Today stats */}
        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-light text-primary">{formatDuration(todayTotal)}</div>
            <div className="text-xs text-muted mt-0.5">Today</div>
          </div>
        </div>
      </div>

      {/* Session log */}
      <SessionLog />
    </div>
  )
}