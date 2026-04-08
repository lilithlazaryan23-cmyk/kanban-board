import type { Task } from "../types/Task";
import { useLocalStorage } from "./useLocalStorage";

export function useTasks() {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

    const addTask = (taskData: Omit<Task, "id" | "order">) => {
        setTasks(prev => [...prev, { ...taskData, id: Date.now(), order: prev.length + 1 }]);
    };

    const moveTask = (id: number, status: Task["status"]) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, status } : task
            )
        );
    };

    const reorderTask = (draggedId: number, targetId: number, targetStatus: Task["status"]) => {
        setTasks(prev => {
            const dragged = prev.find(t => t.id === draggedId);
            if (!dragged) return prev;

            const updated = prev.map(t =>
                t.id === draggedId ? { ...t, status: targetStatus } : t
            );

            const columnTasks = updated
                .filter(t => t.status === targetStatus && t.id !== draggedId)
                .sort((a, b) => a.order - b.order);

            const targetIndex = columnTasks.findIndex(t => t.id === targetId);
            columnTasks.splice(targetIndex, 0, { ...dragged, status: targetStatus });

            const reordered = columnTasks.map((t, i) => ({ ...t, order: i }));

            const otherTasks = updated.filter(t => t.status !== targetStatus);
            return [...otherTasks, ...reordered];
        });
    };

    return { tasks, addTask, moveTask, reorderTask };
}
