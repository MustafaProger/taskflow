import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { getTasks } from "../../api/tasks";

const TaskList = () => {
	// функция с async ВСЕГДА возвращает Promise, даже если внутри есть return c данными.
	// Поэтому при вызове getTasks() мы получаем не данные, а Promise,
	// и чтобы получить сами данные — нужно использовать await или then.

	const [taskList, setTaskList] = useState<Task[] | null>(null);

	useEffect(() => {
		const loadTasks = async () => {
			const getData = await getTasks();
			setTaskList(getData);
		};

		loadTasks();
	}, []);

	console.log(taskList);

	return <div></div>;
};

export default TaskList;
