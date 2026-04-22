import useTimerStore from '../../store/useTimerStore'
import { formatDuration, todayKey } from '../../utils/time'
import { Clock } from 'lucide-react'

export default function SessionLog() {
  const { sessions } = useTimerStore()
  const today = todayKey()
  const todaySessions = [...sessions].filter(s => s.date === today).reverse()

  if (todaySessions.length === 0) return null

  return (
    <div className="border-t border-surface-3 px-8 py-6">
      <h3 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Today's Sessions</h3>
      <div className="flex flex-col gap-2">
        {todaySessions.map(s => (
          <div key={s.id} className="flex items-center gap-3 py-2 px-3 bg-surface-2 rounded-lg">
            <Clock size={13} className="text-accent shrink-0" />
            <span className="text-sm text-primary flex-1 truncate">{s.taskName}</span>
            <span className="text-xs text-muted font-mono">{formatDuration(s.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}