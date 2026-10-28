import TaskItem from "./TaskItem"
import type { Task } from "../types/Task"

type TaskListProps = {
    tasks: Task[]
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    onUpdateTask: (id: string, newTitle: string, deadline: string) => void
}
export default function TaskList({ tasks, onToggle, onDelete, onUpdateTask}: TaskListProps) {
    return (
        <div className="task-list">
            {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onUpdateTask={onUpdateTask}/>
            ))}
        </div>
    )
}