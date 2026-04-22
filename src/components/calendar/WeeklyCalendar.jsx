import { useState } from 'react'
import { getWeekDays, isToday, dateKey } from '../../utils/time'
import useCalendarStore from '../../store/useCalendarStore'
import TimeSlot from './TimeSlot'

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7) // 7am–8pm

export default function WeeklyCalendar() {
  const days = getWeekDays()
  const { calendarTasks, addCalendarTask, deleteCalendarTask } = useCalendarStore()

  const handleSlotClick = (day, hour) => {
    const key = dateKey(day)
    const title = window.prompt('Task name (press Enter to confirm):')
    if (title?.trim()) {
      addCalendarTask(key, { title: title.trim(), startHour: hour, duration: 1 })
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-6 pt-6 pb-3">
        <h1 className="text-xl font-semibold text-primary">Calendar</h1>
        <p className="text-sm text-muted mt-0.5">Click any slot to add a time block</p>
      </div>

      <div className="flex-1 overflow-auto px-2 pb-6">
        <div className="min-w-[700px]">
          {/* Day headers */}
          <div className="grid gap-px mb-px" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>
            <div />
            {days.map((day, i) => {
              const today = isToday(day)
              return (
                <div key={i} className={`py-3 text-center ${today ? '' : ''}`}>
                  <div className="text-xs text-muted uppercase tracking-wider">
                    {day.toLocaleDateString('en', { weekday: 'short' })}
                  </div>
                  <div className={`
                    text-lg font-light mt-0.5 mx-auto w-9 h-9 flex items-center justify-center rounded-full transition-colors
                    ${today ? 'bg-accent text-white font-medium' : 'text-primary'}
                  `}>
                    {day.getDate()}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Time grid */}
          {HOURS.map(hour => (
            <div key={hour} className="grid gap-px" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>
              {/* Hour label */}
              <div className="pr-2 pt-1 text-right text-xs text-muted font-mono h-12 flex items-start justify-end">
                {hour === 12 ? '12pm' : hour < 12 ? `${hour}am` : `${hour-12}pm`}
              </div>
              {/* Slots */}
              {days.map((day, di) => {
                const key = dateKey(day)
                const tasksHere = (calendarTasks[key] || []).filter(t => t.startHour === hour)
                return (
                  <div
                    key={di}
                    className={`
                      relative h-12 border-t border-surface-3 cursor-pointer group
                      ${isToday(day) ? 'bg-accent/3' : 'hover:bg-surface-2'}
                      transition-colors
                    `}
                    onClick={() => handleSlotClick(day, hour)}
                  >
                    {tasksHere.map(task => (
                      <TimeSlot
                        key={task.id}
                        task={task}
                        onDelete={() => deleteCalendarTask(key, task.id)}
                      />
                    ))}
                    {/* Hover + hint */}
                    {tasksHere.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-muted">+ add</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}