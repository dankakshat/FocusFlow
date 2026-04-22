import { Trash2, FolderOpen } from 'lucide-react'
import useProjectStore from '../../store/useProjectStore'
import useTaskStore from '../../store/useTaskStore'

export default function ProjectCard({ project, onClick, active }) {
  const { deleteProject } = useProjectStore()
  const { tasks } = useTaskStore()

  const projectTasks = tasks.filter(t => t.projectId === project.id)
  const completed = projectTasks.filter(t => t.completed).length
  const progress = projectTasks.length ? (completed / projectTasks.length) * 100 : 0

  return (
    <div
      onClick={onClick}
      className={`
        group relative cursor-pointer p-5 rounded-2xl border transition-all duration-200
        ${active ? 'border-accent/60 bg-accent/5' : 'border-surface-3 bg-surface-2 hover:border-surface-4'}
      `}
    >
      {/* Color dot */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: project.color }} />
        <span className="font-medium text-primary text-sm">{project.name}</span>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-muted mb-4">
        <span>{projectTasks.length} tasks</span>
        <span>{completed} done</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface-4 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: project.color }}
        />
      </div>

      {/* Delete */}
      <button
        onClick={e => { e.stopPropagation(); deleteProject(project.id) }}
        className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 text-muted hover:text-danger transition-all rounded-lg hover:bg-surface-3"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}