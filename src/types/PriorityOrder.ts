import type { Task } from "./Task";

export const PriorityOrder:  Record<Task['priority'], number> = {
    "high": 1,
    "medium": 2,
    "low": 3
}