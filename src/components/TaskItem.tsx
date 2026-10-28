import { useState } from "react";
import type { Task } from "../types/Task";
import { priorityLabels } from "../types/PriorityLabes"
import DeadlinePicker from "./DeadlinePicker";

type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdateTask: (id: string, newTitle: string,deadline: string) => void;
};

export default function TaskItem({
    task,
    onToggle,
    onDelete,
    onUpdateTask,
}: TaskItemProps) {
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInput] = useState(task.title);
    const [editingDeadline, setEditingDeadline] = useState(task.deadline ?? "");

    function handleEdit() {
        setInput(task.title);
        setEditingDeadline(task.deadline ?? "");
        setEditing(true);
    }

    function handleSave() {
        const newTitle = inputValue.trim();

        if (!newTitle) return;

        onUpdateTask(task.id, newTitle,editingDeadline);
        setEditing(false);
    }

    function handleCancel() {
        setInput(task.title);
        setEditing(false);
    }

    function getDateFormat(date: string): string {
        if (!date || date.trim() === '') {
            return 'не вказано';
        }
        const [year, month, day] = (date ?? '').split('-').map(Number);
        const localDate = new Date(year, month - 1, day);
        const formattedDate = new Intl.DateTimeFormat('uk-UA', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(localDate);
        return formattedDate
    }

    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    const isOverdue =
        Boolean(task.deadline) &&
        task.deadline! < todayString &&
        !task.completed;

    const isLocked = Boolean(task.deadline) && task.deadline! < todayString;

    if (isEditing) {
        return (
            <div className="task-item">
                <input
                    className="edit-input"
                    value={inputValue}
                    onChange={event => setInput(event.target.value)}
                    onKeyDown={event => {
                        if (event.key === "Enter") handleSave();
                        if (event.key === "Escape") handleCancel();
                    }}
                />
                <DeadlinePicker deadline={editingDeadline} onSetDeadline={setEditingDeadline}/>

                <div className="task-actions">
                    <button onClick={handleSave}>Зберегти</button>
                    <button onClick={handleCancel}>Скасувати</button>
                </div>
            </div>
        );
    }

    return (
        <div className="task-item">
            <div className="task-main">
                <div className="task-top-row">
                    {!isLocked && (
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggle(task.id)}
                        />
                    )}

                    <span
                        className="task-title"
                        style={{
                            textDecoration: task.completed ? "line-through" : "none",
                            color: task.completed ? "#9295aa" : undefined
                        }}
                    >
                        {task.title}
                    </span>

                    <span className={`priority-badge priority-${task.priority}`}>
                        {priorityLabels[task.priority]}
                    </span>
                </div>

                <div className="task-info">
                    <span className={`task-deadline ${isOverdue ? "overdue" : ""}`}>
                        Дедлайн: {getDateFormat(task.deadline ?? "")}
                    </span>

                    {isOverdue && (
                        <span className="overdue-label">
                            Прострочено
                        </span>
                    )}
                </div>
            </div>

            <div className="task-actions">
                {!isLocked && (
                    <button onClick={handleEdit}>Редагувати</button>
                )}
                <button onClick={() => onDelete(task.id)}>Видалити</button>
            </div>
        </div>
    );
}
