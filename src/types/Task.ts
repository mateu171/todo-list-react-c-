import type {TaskPriority} from "./TaskPriority"

export type Task = {
    readonly id: string
    title: string,
    completed: boolean,
    priority: TaskPriority,
    deadline?: string
}