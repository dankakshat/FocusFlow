import { useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import useTaskStore from '../../store/useTaskStore'
import useProjectStore from '../../store/useProjectStore'
import TaskItem from './TaskItem'
import TaskModal from './TaskModal'
import Button from '../ui/Button'

export default function TaskList() {
  const { tasks } = useTaskStore()
  const { projects, activeProjectId } = useProjectStore()
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')  // all | active | done

  const filtered = tasks
    .filter(t => activeProjectId ? t.projectId === activeProjectId : true)
    .filter(t => filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed)

  const activeProject = activeProjectId ? projects.find(p => p.id === activeProjectId) : null

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-primary">
            {activeProject ? activeProject.name : 'All Tasks'}
          </h1>
          <p className="text-sm text-muted mt-0.5">
            {filtered.filter(t => !t.completed).length} remaining
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={15} />New Task
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 bg-surface-2 rounded-xl p-1 w-fit">
        {['all','active','done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
              ${filter === f ? 'bg-surface-4 text-primary' : 'text-muted hover:text-subtle'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <Filter size={28} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No tasks here. Add one!</p>
          </div>
        ) : (
          filtered.map(task => <TaskItem key={task.id} task={task} />)
        )}
      </div>

      <TaskModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}