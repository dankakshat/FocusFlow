import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import useTimerStore from '../../store/useTimerStore'
import useTaskStore from '../../store/useTaskStore'
import { formatDuration, todayKey } from '../../utils/time'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.[0]) {
    return (
      <div className="bg-surface-3 border border-surface-4 rounded-xl px-3 py-2 text-xs">
        <p className="text-muted mb-1">{label}</p>
        <p className="text-primary font-medium">{formatDuration(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export default function Analytics() {
  const { weeklyData, sessions, totalForDate } = useTimerStore()
  const { tasks } = useTaskStore()

  const data = Object.entries(weeklyData()).map(([date, seconds]) => ({
    date: new Date(date + 'T00:00').toLocaleDateString('en', { weekday: 'short' }),
    seconds,
    dateKey: date,
  }))

  const today = todayKey()
  const todayTotal = totalForDate(today)
  const weekTotal = data.reduce((s, d) => s + d.seconds, 0)
  const completedTasks = tasks.filter(t => t.completed).length

  // Tag breakdown
  const tagMap = {}
  tasks.forEach(t => { tagMap[t.tag] = (tagMap[t.tag] || 0) + 1 })
  const tagData = Object.entries(tagMap).sort((a,b) => b[1]-a[1]).slice(0,5)

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
      <h1 className="text-xl font-semibold text-primary mb-6">Analytics</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Today', value: formatDuration(todayTotal) },
          { label: 'This Week', value: formatDuration(weekTotal) },
          { label: 'Tasks Done', value: `${completedTasks}/${tasks.length}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface-2 border border-surface-3 rounded-xl px-5 py-4">
            <div className="text-2xl font-light text-primary">{value}</div>
            <div className="text-xs text-muted mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-5 mb-6">
        <h2 className="text-sm font-medium text-primary mb-5">Weekly Focus Time</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={24}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
            <YAxis
              tickFormatter={v => formatDuration(v)}
              axisLine={false} tickLine={false}
              tick={{ fill: '#71717a', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
            <Bar dataKey="seconds" radius={[6,6,0,0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.dateKey === today ? '#7c6ff7' : '#3d3a6b'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tag breakdown */}
      {tagData.length > 0 && (
        <div className="bg-surface-2 border border-surface-3 rounded-2xl p-5">
          <h2 className="text-sm font-medium text-primary mb-4">Tasks by Category</h2>
          <div className="flex flex-col gap-2.5">
            {tagData.map(([tag, count]) => (
              <div key={tag} className="flex items-center gap-3">
                <span className="text-sm text-subtle w-24 shrink-0">{tag}</span>
                <div className="flex-1 h-2 bg-surface-4 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${(count / tasks.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted w-4 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}