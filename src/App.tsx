import { useState } from "react";
import type { Task } from "./types/Task";
import TaskInput from "./components/TaskInput";
import Column from "./components/Column";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (text: string) => {
        if (!text) return;

        setTasks(prev => [
            ...prev,
            { id: Date.now(), text, status: "todo" }
        ]);
    };

    const moveTask = (id: number, status: Task["status"]) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, status } : task
            )
        );
    };

    const columns = [
        { title: "To Do", status: "todo" },
        { title: "Doing", status: "doing" },
        { title: "Done", status: "done" }
    ] as const;

    return (
        <div className="app">
            <TaskInput addTask={addTask} />

            {columns.map(col => (
                <Column
                    key={col.status}
                    title={col.title}
                    status={col.status}
                    tasks={tasks}
                    moveTask={moveTask}
                />
            ))}
        </div>
    );
}

export default App;