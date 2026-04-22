import { useState } from 'react'
import { Check, Pencil, Trash2, Clock } from 'lucide-react'
import useTaskStore from '../../store/useTaskStore'
import useProjectStore from '../../store/useProjectStore'
import Badge from '../ui/Badge'
import TaskModal from './TaskModal'

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTaskStore()
  const { getById } = useProjectStore()
  const [editing, setEditing] = useState(false)
  const project = task.projectId ? getById(task.projectId) : null

  return (
    <>
      <div className={`
        group flex items-start gap-3 px-4 py-3 rounded-xl border transition-all duration-150
        ${task.completed
          ? 'bg-surface-1 border-surface-3 opacity-50'
          : 'bg-surface-2 border-surface-3 hover:border-surface-4'}
      `}>
        {/* Checkbox */}
        <button
          onClick={() => toggleTask(task.id)}
          className={`
            mt-0.5 w-4 h-4 shrink-0 rounded flex items-center justify-center border transition-all
            ${task.completed ? 'bg-success border-success' : 'border-surface-4 hover:border-accent'}
          `}
        >
          {task.completed && <Check size={10} strokeWidth={3} className="text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className={`text-sm ${task.completed ? 'line-through text-muted' : 'text-primary'}`}>
            {task.title}
          </span>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock size={10} />{task.duration}m
            </span>
            <Badge color="#7c6ff7">{task.tag}</Badge>
            {project && <Badge color={project.color}>{project.name}</Badge>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditing(true)} className="p-1.5 hover:text-primary text-muted transition-colors rounded-lg hover:bg-surface-3">
            <Pencil size={13} />
          </button>
          <button onClick={() => deleteTask(task.id)} className="p-1.5 hover:text-danger text-muted transition-colors rounded-lg hover:bg-surface-3">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <TaskModal open={editing} onClose={() => setEditing(false)} task={task} />
    </>
  )
}