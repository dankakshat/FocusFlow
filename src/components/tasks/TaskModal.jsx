import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import useTaskStore from '../../store/useTaskStore'
import useProjectStore from '../../store/useProjectStore'

const TAGS = ['General','Deep Work','Meeting','Research','Writing','Design','Code','Review']

export default function TaskModal({ open, onClose, task = null }) {
  const { addTask, updateTask } = useTaskStore()
  const { projects } = useProjectStore()

  const [form, setForm] = useState({
    title: task?.title || '',
    duration: task?.duration || 25,
    tag: task?.tag || 'General',
    projectId: task?.projectId || '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.title.trim()) return
    task ? updateTask(task.id, form) : addTask(form)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={task ? 'Edit Task' : 'New Task'}>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-muted mb-1.5 block">Title</label>
          <input
            autoFocus
            value={form.title}
            onChange={e => set('title', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Task name..."
            className="w-full bg-surface-3 border border-surface-4 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Duration (min)</label>
            <input
              type="number" min={1} max={480}
              value={form.duration}
              onChange={e => set('duration', +e.target.value)}
              className="w-full bg-surface-3 border border-surface-4 rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Tag</label>
            <select
              value={form.tag}
              onChange={e => set('tag', e.target.value)}
              className="w-full bg-surface-3 border border-surface-4 rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-accent/50"
            >
              {TAGS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs text-muted mb-1.5 block">Project (optional)</label>
          <select
            value={form.projectId}
            onChange={e => set('projectId', e.target.value)}
            className="w-full bg-surface-3 border border-surface-4 rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-accent/50"
          >
            <option value="">No project</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit}>{task ? 'Save' : 'Add Task'}</Button>
        </div>
      </div>
    </Modal>
  )
}