export type TaskFilterKey = "allTasks" | "active" | "done";

export type TaskFilterType = {
	key: TaskFilterKey;
	label: string;
};

export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "active" | "done";

export type Task = {
	id: string;
	title: string;
	description?: string;
	priority?: TaskPriority;
	status: TaskStatus;
	time?: string;
	labels?: string[];
};
