import { useState } from "react";

export default function TaskInput({ addTask }: { addTask: (text: string) => void }) {
    const [text, setText] = useState("");

    return (
        <div>
            <button onClick={() => {
                addTask(text);
                setText("");
            }}>
                <p>+    </p> Add
            </button>
        </div>
    );
}