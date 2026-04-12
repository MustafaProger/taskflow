import type { Task } from "../types/task";

// 2 знака вопроса берут только null или undefined
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

function getTasksUrl() {
	return apiBaseUrl ? `${apiBaseUrl}/tasks` : "/tasks.json";
}

export async function getTasks(): Promise<Task[]> {
	try {

		// await ждет завершения Promise и возвращает результат
		const req = await fetch(getTasksUrl());

		if (!req.ok) {
			throw new Error("Ошибка запроса!");
		}

		const data = await req.json();
		
		return data;
	} catch (e) {
		console.log(e);
		return [];
	}
}
