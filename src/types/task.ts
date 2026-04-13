export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "active" | "done";

export type Task = {
	id: number;
	title: string;
	description?: string;
	priority: TaskPriority;
	status: TaskStatus;
	time?: string;
	labels?: string[];
};
