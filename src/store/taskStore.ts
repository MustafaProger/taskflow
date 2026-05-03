import { create } from "zustand";
import type { Task, TaskFilterKey } from "../types/task";

type TaskStore = {
	// state
	tasks: Task[];
	filter: TaskFilterKey;
	search: string;
	isAddTaskOpen: boolean;

	// actions
	setTasks: (tasks: Task[]) => void;
	toggleTask: (id: string) => void;
	deleteTask: (id: string) => void;
	setFilter: (filter: TaskFilterKey) => void;
	setSearch: (text: string) => void;
	setIsAddTaskOpen: (booleanValue: boolean) => void;
	setIsAddTaskClose: (booleanValue: boolean) => void;
	setAddTask: (task: Task) => void;
};

// create<TaskStore>()((set) => ({ ... }))
//
// Здесь две функции подряд:
// 1. create<TaskStore>()
//    - мы передаём тип store
//    - получаем функцию, которая потом примет логику создания store
//
// 2. ((set) => ({ ... }))
//    - это уже функция-инициализатор store
//    - Zustand сам передаёт в неё set
//
// Почему тут есть () после <TaskStore>?
// Потому что create<TaskStore>() ещё не создаёт store окончательно.
// Этот вызов сначала настраивает типизацию,
// а потом второй вызов передаёт реальную логику store.
//
// То есть это можно мысленно читать так:
// const createTypedStore = create<TaskStore>();
// const useTaskStore = createTypedStore((set) => ({ ... }));
//
// В итоге create:
// - создаёт store
// - и возвращает хук useTaskStore для работы с ним
export const useTaskStore = create<TaskStore>()((set) => ({
	// -----------------------
	// STATE
	// -----------------------
	// Данные, которые лежат в store
	tasks: [],
	filter: "allTasks",
	search: "",
	isAddTaskOpen: false,

	// -----------------------
	// ACTIONS
	// -----------------------
	// set — это функция от Zustand для обновления state.
	// Это универсальный setState.
	//
	// set можно вызвать двумя способами:
	// 1. set({ tasks })
	//    - сразу передаём объект с изменениями
	//
	// 2. set((state) => ({ tasks: ... }))
	//    - передаём функцию
	//    - функция получает текущий state
	//    - и должна вернуть объект с изменениями
	//
	// ВАЖНО:
	// set сам ничего не возвращает.
	// Он принимает изменения и обновляет store.

	// Полностью заменить массив tasks новым массивом
	setTasks: (tasks) => set({ tasks }),

	// Здесь нужен set((state) => ...),
	// потому что нам нужен текущий state,
	// чтобы построить новый массив tasks на его основе.
	toggleTask: (id) =>
		set((state) => ({
			tasks: state.tasks.map((task) => {
				if (task.id !== id) {
					return task;
				}

				return {
					...task,
					status: task.status === "active" ? "done" : "active",
				};
			}),
		})),

	// - возвращаем новый объект с обновлённым tasks
	deleteTask: (id) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		})),

	setFilter: (filter) => set({ filter }),
	setSearch: (search) => set({ search }),
	setIsAddTaskOpen: (booleanValue) =>
		set(() => {
			document.body.classList.add("no-scroll");
			return { isAddTaskOpen: booleanValue };
		}),
	setIsAddTaskClose: (booleanValue) =>
		set(() => {
			document.body.classList.remove("no-scroll");
			return { isAddTaskOpen: booleanValue };
		}),

	setAddTask: (task) =>
		set((state) => ({
			tasks: [...state.tasks, task],
		})),
}));
