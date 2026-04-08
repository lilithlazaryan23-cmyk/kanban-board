import type { Task } from "../types/Task";

export const COLUMNS: readonly { title: string; status: Task["status"] }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Process", status: "doing" },
    { title: "Done", status: "done" },
] as const;
