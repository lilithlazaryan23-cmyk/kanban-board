
import type { Task } from "../types/Task.ts";
import TaskItem from "./TaskItem";

type Props = {
    title: string;
    status: Task["status"];
    tasks: Task[];
    moveTask: (id: number, status: Task["status"]) => void;
};


export default function Column({ title, status, tasks, moveTask }: Props) {
    return (
        <div style={{ width: "250px", background: "#eee", padding: "10px" }}>
            <h3>{title}</h3>

            {tasks
                .filter(t => t.status === status)
                .map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        moveTask={moveTask}
                    />
                ))}
        </div>
    );
}