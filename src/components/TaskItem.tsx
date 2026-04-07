import type { Task } from "../types/Task.ts";

type Props = {
    task: Task;
    moveTask: (id: number, status: Task["status"]) => void;
};

export default function TaskItem({ task, moveTask }: Props) {

    return (
        <div style={{ background: "white", padding: "10px", marginTop: "10px" }}>
            <div>
                <button onClick={() => moveTask(task.id, "todo")}>Todo</button>
                <button onClick={() => moveTask(task.id, "doing")}>Doing</button>
                <button onClick={() => moveTask(task.id, "done")}>Done</button>
            </div>
        </div>
    );
}