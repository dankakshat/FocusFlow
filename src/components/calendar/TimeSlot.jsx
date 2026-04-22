import { X } from 'lucide-react'

export default function TimeSlot({ task, onDelete }) {
  return (
    <div
      className="group absolute inset-x-0.5 top-0.5 bottom-0.5 rounded px-1.5 py-1 flex items-center justify-between z-10"
      style={{
        background: (task.color || '#7c6ff7') + '25',
        borderLeft: `2px solid ${task.color || '#7c6ff7'}`,
      }}
      onClick={e => e.stopPropagation()}
    >
      <span className="text-[11px] font-medium text-primary truncate">{task.title}</span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-muted hover:text-danger shrink-0 ml-1 transition-opacity"
      >
        <X size={10} />
      </button>
    </div>
  )
}