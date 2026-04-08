export type Task = {
    id: number;
    text: string;
    description?: string;
    date?: string;
    attachment?: string;
    reminder?: string;
    status: "todo" | "doing" | "done";
    order: number
};