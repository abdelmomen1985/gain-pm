import { Droppable, Draggable } from '@hello-pangea/dnd'
import type { Task, Status } from '@/types'
import TaskCard from './TaskCard'
import { cn } from '@/lib/utils'
import { statusLabels } from '@/utils'

interface KanbanColumnProps {
  status: Status
  tasks: Task[]
  onMoveForward: (taskId: string) => void
  onMoveBack: (taskId: string) => void
}

export default function KanbanColumn({ status, tasks, onMoveForward, onMoveBack }: KanbanColumnProps) {
  return (
    <div className="bg-muted/50 rounded-xl p-4 min-h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
          {statusLabels[status]}
          <span className="bg-white text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </h2>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "space-y-3 min-h-[400px] transition-colors",
              snapshot.isDraggingOver && "bg-primary/5 rounded-lg p-2"
            )}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging ? provided.draggableProps.style?.transform : undefined,
                    }}
                  >
                    <TaskCard
                      task={task}
                      onMoveForward={onMoveForward}
                      onMoveBack={onMoveBack}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                No tasks
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}
