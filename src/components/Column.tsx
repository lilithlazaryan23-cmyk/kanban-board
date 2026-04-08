import {useState} from  "react"
import type { Task } from "../types/Task.ts";
import TaskItem from "./TaskItem";

type Props = {
    title: string;
    status: Task["status"];
    tasks: Task[];
    moveTask: (id: number, status: Task["status"]) => void;
    reorderTask: (draggedId: number, targetId: number, targetStatus: Task["status"]) => void;
};

export default function Column({ title, status, tasks, moveTask, reorderTask }: Props) {
    const [isDragOver, setIsDragOver] = useState(false);
    const columnTasks = tasks
        .filter(task => task.status === status)
        .sort((a, b) => a.order - b.order);
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const taskId = Number(e.dataTransfer.getData("taskId"));
        moveTask(taskId, status);
    };
    return (
        <div
            className={`column ${isDragOver ? "drag-over" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h3 className="column-title">{title}</h3>

            {columnTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        moveTask={moveTask}
                        reorderTask={reorderTask}
                        status={status}
                    />
                ))}
        </div>
    );
}