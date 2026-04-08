import { useState } from "react";
import type { Task } from "../types/Task";

type Props = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: (task: Omit<Task, "id" | "order">) => void;
};

export default function AddTaskModal({ isOpen, onCancel, onConfirm }: Props) {
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [attachment, setAttachment] = useState("");
    const [reminder, setReminder] = useState("");
    const [status, setStatus] = useState<Task["status"]>("todo");

    const resetForm = () => {
        setText("");
        setDescription("");
        setDate("");
        setAttachment("");
        setReminder("");
        setStatus("todo");
    };

    const handleConfirm = () => {
        if (!text.trim()) return;

        onConfirm({
            text: text.trim(),
            description: description.trim() || undefined,
            date: date || undefined,
            attachment: attachment.trim() || undefined,
            reminder: reminder.trim() || undefined,
            status,
        });

        resetForm();
    };

    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    return (
        <div className={`modal ${isOpen ? "active" : ""}`}>
            <div className="modal-content">
                <h2 className="modal-title">New Task</h2>

                <label className="modal-label">Name</label>
                <input
                    type="text"
                    placeholder="Task name..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                />

                <label className="modal-label">Description</label>
                <textarea
                    placeholder="Add a description..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <label className="modal-label">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />

                <label className="modal-label">Attachment</label>
                <input
                    type="text"
                    placeholder="Paste a link or file name..."
                    value={attachment}
                    onChange={e => setAttachment(e.target.value)}
                />

                <label className="modal-label">Reminder</label>
                <input
                    type="text"
                    placeholder="e.g. Tomorrow at 9am"
                    value={reminder}
                    onChange={e => setReminder(e.target.value)}
                />

                <label className="modal-label">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as Task["status"])}>
                    <option value="todo">To Do</option>
                    <option value="doing">In Process</option>
                    <option value="done">Done</option>
                </select>

                <div className="modal-buttons">
                    <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    <button className="btn-confirm" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}
