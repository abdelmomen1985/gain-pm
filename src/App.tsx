import { useState } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { Task, Status } from './types'
import { initialTasks, calculateMetrics } from './utils'
import MetricsDisplay from './components/MetricsDisplay'
import CreateTask from './components/CreateTask'
import KanbanColumn from './components/KanbanColumn'
import { Button } from './components/ui/button'
import { Filter } from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedTeam, setSelectedTeam] = useState<'all' | Task['team']>('all')

  const metrics = calculateMetrics(tasks)

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks([...tasks, task])
  }

  const handleMoveTask = (taskId: string, direction: 'forward' | 'back') => {
    const statusOrder: Status[] = ['draft', 'visuals', 'audit', 'approved']
    setTasks(tasks.map(task => {
      if (task.id !== taskId) return task

      const currentIndex = statusOrder.indexOf(task.status)
      const newIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1

      if (newIndex < 0 || newIndex >= statusOrder.length) return task

      const newStatus = statusOrder[newIndex]
      const newHoursWorked = direction === 'forward' ? (task.hoursWorked || 0) + 1 : task.hoursWorked
      const newRevisionCount = direction === 'back' ? (task.revisionCount || 0) + 1 : task.revisionCount

      return {
        ...task,
        status: newStatus,
        hoursWorked: newHoursWorked,
        revisionCount: newRevisionCount,
        updatedAt: new Date(),
      }
    }))
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const statusOrder: Status[] = ['draft', 'visuals', 'audit', 'approved']
    const sourceStatusIndex = statusOrder.indexOf(source.droppableId as Status)
    const destinationStatusIndex = statusOrder.indexOf(destination.droppableId as Status)

    const updatedTasks = [...tasks]
    const taskIndex = updatedTasks.findIndex(t => t.id === draggableId)
    if (taskIndex === -1) return

    const task = updatedTasks[taskIndex]

    if (destination.droppableId === source.droppableId) {
      const newTasks = [...tasks]
      newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, task)
      setTasks(newTasks)
    } else {
      const newStatus = destination.droppableId as Status
      const isMovingForward = destinationStatusIndex > sourceStatusIndex
      const newHoursWorked = isMovingForward ? (task.hoursWorked || 0) + 1 : task.hoursWorked
      const newRevisionCount = !isMovingForward ? (task.revisionCount || 0) + 1 : task.revisionCount

      const updatedTask = {
        ...task,
        status: newStatus,
        hoursWorked: newHoursWorked,
        revisionCount: newRevisionCount,
        updatedAt: new Date(),
      }

      const newTasks = [...tasks]
      newTasks.splice(taskIndex, 1)
      newTasks.splice(destination.index, 0, updatedTask)
      setTasks(newTasks)
    }
  }

  const filteredTasks = selectedTeam === 'all' 
    ? tasks 
    : tasks.filter(t => t.team === selectedTeam)

  const statuses: Status[] = ['draft', 'visuals', 'audit', 'approved']

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">GAIN Medical Marketing</h1>
            <p className="text-muted-foreground text-lg">Content Workflow Management</p>
          </header>

          <MetricsDisplay metrics={metrics} />

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by Team:</span>
              <div className="flex gap-2">
                {(['all', 'medical', 'visual', 'qa'] as const).map(team => (
                  <Button
                    key={team}
                    variant={selectedTeam === team ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTeam(team)}
                  >
                    {team === 'all' ? 'All Teams' : team.charAt(0).toUpperCase() + team.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <CreateTask onCreateTask={handleCreateTask} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statuses.map(status => (
              <KanbanColumn
                key={status}
                status={status}
                tasks={filteredTasks.filter(t => t.status === status)}
                onMoveForward={(taskId) => handleMoveTask(taskId, 'forward')}
                onMoveBack={(taskId) => handleMoveTask(taskId, 'back')}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

export default App
