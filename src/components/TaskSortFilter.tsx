import type { TaskFilter } from "../types/TaskFilter";

type TaskSortFilterProps = {
    onSetFilter: (value: TaskFilter) => void;
    onSetSort: (value: 1 | -1) => void;
};

export default function TaskSortFilter({
    onSetFilter,
    onSetSort
}: TaskSortFilterProps) {
    return (
        <div className="task-controls">
            <div className="control-group">
                <label htmlFor="task-filter">Фільтрація</label>
                <select
                    id="task-filter"
                    className="control-select"
                    defaultValue="all"
                    onChange={(e) => {
                        const value = e.target.value;

                        if (
                            value === "all" ||
                            value === "active" ||
                            value === "completed"
                        ) {
                            onSetFilter(value);
                        }
                    }}
                >
                    <option value="all">Усі завдання</option>
                    <option value="active">Активні</option>
                    <option value="completed">Виконані</option>
                </select>
            </div>

            <div className="control-group">
                <label htmlFor="task-sort">Сортування</label>
                <select
                    id="task-sort"
                    className="control-select"
                    defaultValue="-1"
                    onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value === 1 || value === -1) {
                            onSetSort(value);
                        }
                    }}
                >
                    <option value="-1">Спочатку високий пріоритет</option>
                    <option value="1">Спочатку низький пріоритет</option>
                </select>
            </div>
        </div>
    );
}