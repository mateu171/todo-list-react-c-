import { useState } from "react";
import type { TaskPriority } from "../types/TaskPriority"
import { priorityLabels } from "../types/PriorityLabes"
import DeadlinePicker from "./DeadlinePicker";

type TaskFormProp = {
    onAddTask: (title: string, priority: TaskPriority, deadline: string) => void
    onSetDeadline: (deadline: string) => void
    deadline: string
}
export default function TaskForm({ onAddTask,onSetDeadline,deadline }: TaskFormProp) {
    const [title, setTitle] = useState("")
    const [priorityValue, setPriority] = useState<TaskPriority>("low")

    function handleFrom(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(`Tile ${title}`)
        if (title.trim().length !== 0) {
            onAddTask(title, priorityValue,deadline)
            setTitle("")
            onSetDeadline("")
        }
    }
    return (
        <form onSubmit={handleFrom} className="task-form">
            <input type="text" placeholder="Назва завдання" value={title} onChange={(event) => setTitle(event.target.value)} />
            <DeadlinePicker deadline={deadline} onSetDeadline={onSetDeadline}/>
            <select value={priorityValue} onChange={(e) => {
                const value = e.target.value;

                if (isTaskPriority(value)) {
                    setPriority(value);
                }
            }}>
                <option value="low">{priorityLabels.low}</option>
                <option value="medium">{priorityLabels.medium}</option>
                <option value="high">{priorityLabels.high}</option>
            </select>
            <button className="primary-button" type="submit">Додати</button>
        </form>
    );
}

function isTaskPriority(value: string): value is TaskPriority {
    return value === "low" || value === "medium" || value === "high";
}