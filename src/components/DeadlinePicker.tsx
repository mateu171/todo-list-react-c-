type DeadlinePickerProps = {
    deadline: string,
    onSetDeadline: (deadline: string) => void
}

export default function DealinePicker({ deadline, onSetDeadline }: DeadlinePickerProps) {
    return (
        <>
            <input type="date" value={deadline} onChange={(e) => onSetDeadline(e.target.value)} min={new Date().toISOString().split('T')[0]}></input>
        </>
    )
}