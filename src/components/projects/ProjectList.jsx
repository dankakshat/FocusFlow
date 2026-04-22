import { useState } from 'react'
import { Plus, FolderOpen } from 'lucide-react'
import useProjectStore from '../../store/useProjectStore'
import ProjectCard from './ProjectCard'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

export default function ProjectList({ setView }) {
  const { projects, addProject, activeProjectId, setActiveProject } = useProjectStore()
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')

  const submit = () => {
    if (!name.trim()) return
    addProject(name.trim())
    setName('')
    setShowModal(false)
  }

  const handleClick = (id) => {
    setActiveProject(id === activeProjectId ? null : id)
    setView('tasks')
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-primary">Projects</h1>
          <p className="text-sm text-muted mt-0.5">{projects.length} projects</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={15} />New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-muted">
          <FolderOpen size={40} className="mb-4 opacity-20" />
          <p className="text-sm">No projects yet. Create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              active={activeProjectId === p.id}
              onClick={() => handleClick(p.id)}
            />
          ))}
        </div>
      )}

      {/* New project modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Project">
        <div className="flex flex-col gap-4">
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Project name..."
            className="w-full bg-surface-3 border border-surface-4 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/50"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={submit}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}