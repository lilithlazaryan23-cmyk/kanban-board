import { useState } from "react";
import type { Task } from "./types/Task";
import { useTasks } from "./hooks/useTasks";
import AddTaskButton from "./components/AddTaskButton";
import AddTaskModal from "./components/AddTaskModal";
import Column from "./components/Column";
import { COLUMNS } from "./constants/columns";
import "./App.css";

function App() {
    const { tasks, addTask, moveTask, reorderTask } = useTasks();
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddTask = (taskData: Omit<Task, "id" | "order">) => {
        addTask(taskData);
        setModalOpen(false);
    };

    return (
        <div className="app">
            <div className="app-header">
                <AddTaskButton onClick={() => setModalOpen(true)} />
            </div>

            <div className="columns">
                {COLUMNS.map(col => (
                    <Column
                        key={col.status}
                        title={col.title}
                        status={col.status}
                        tasks={tasks}
                        moveTask={moveTask}
                        reorderTask={reorderTask}
                    />
                ))}
            </div>

            <AddTaskModal
                isOpen={modalOpen}
                onCancel={() => setModalOpen(false)}
                onConfirm={handleAddTask}
            />
        </div>
    );
}

export default App;
