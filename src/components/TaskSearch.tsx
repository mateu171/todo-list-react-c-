type TaskSearchProp = {
    onSearch: (value: string) => void
}

export default function TaskSearch({ onSearch }: TaskSearchProp) {
    return (
        <div className="task-search">
            <input
                id="task-search-input"
                className="task-search-input"
                type="text"
                placeholder="Знайти завдання..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}