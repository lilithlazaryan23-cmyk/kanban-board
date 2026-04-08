import { useState } from "react";
import type { Task } from "../types/Task.ts";

type Props = {
    task: Task;
    moveTask: (id: number, status: Task["status"]) => void;
    reorderTask: (draggedId: number, targetId: number, targetStatus: Task["status"]) => void;
    status: Task["status"];
};

export default function TaskItem({ task, reorderTask, status }: Props) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("taskId", String(task.id));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const draggedId = Number(e.dataTransfer.getData("taskId"));
        if (draggedId !== task.id) {
            reorderTask(draggedId, task.id, status);
        }
    };

    return (
        <div
            className={`task-card ${isDragOver ? "drag-over-task" : ""}`}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <p className="task-text">{task.text}</p>
            {task.description && <p className="task-desc">{task.description}</p>}
            {task.date && <span className="task-date">{task.date}</span>}
        </div>
    );
}