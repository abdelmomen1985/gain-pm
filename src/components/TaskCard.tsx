import type { Task } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, User, RefreshCw, CheckCircle2 } from 'lucide-react'
import { teamColors } from '@/utils'

interface TaskCardProps {
  task: Task
  onMoveForward: (taskId: string) => void
  onMoveBack: (taskId: string) => void
  isDragging?: boolean
}

export default function TaskCard({ task, onMoveForward, onMoveBack, isDragging }: TaskCardProps) {
  const statusOrder: Task['status'][] = ['draft', 'visuals', 'audit', 'approved']
  const currentIndex = statusOrder.indexOf(task.status)
  const canMoveForward = currentIndex < statusOrder.length - 1
  const canMoveBack = currentIndex > 0

  const getForwardButtonText = () => {
    switch (task.status) {
      case 'draft': return 'Send to Visuals'
      case 'visuals': return 'Submit for Audit'
      case 'audit': return 'Approve'
      default: return ''
    }
  }

  return (
    <Card
      className={`cursor-grab active:cursor-grabbing transition-all hover:shadow-md ${isDragging ? 'shadow-lg rotate-2' : 'shadow-sm'} ${teamColors[task.team]} border-l-4`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-800 flex-1">{task.title}</h3>
          <Badge variant="outline" className="ml-2 font-medium">
            {task.team.toUpperCase()}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {task.assignee && (
            <div className="flex items-center gap-1 text-xs text-gray-600 bg-white/60 px-2 py-1 rounded">
              <User className="w-3 h-3" />
              {task.assignee}
            </div>
          )}
          {task.hoursWorked && (
            <div className="flex items-center gap-1 text-xs text-gray-600 bg-white/60 px-2 py-1 rounded">
              <Clock className="w-3 h-3" />
              {task.hoursWorked}h
            </div>
          )}
          {task.revisionCount !== undefined && task.revisionCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-600 bg-white/60 px-2 py-1 rounded">
              <RefreshCw className="w-3 h-3" />
              {task.revisionCount} rev
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {canMoveBack && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => onMoveBack(task.id)}
            >
              ← Back
            </Button>
          )}
          {canMoveForward && (
            <Button
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onMoveForward(task.id)}
            >
              {getForwardButtonText()} →
            </Button>
          )}
          {task.status === 'approved' && (
            <div className="flex-1 flex items-center justify-center text-xs text-green-700 font-medium gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Published
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
