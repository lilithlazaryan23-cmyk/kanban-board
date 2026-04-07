export type Task = {
    id: number;
    text: string;
    description?: string;
    date?: string;
    priority?: string;
    status: "todo" | "doing" | "done";
};