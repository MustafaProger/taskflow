import { useEffect, useState } from "react";
import { useTaskStore } from "../../../store/taskStore";
import { getTasks } from "../../../api/tasks";
import "./TaskList.css";

import edit from "../../../assets/icons/edit.svg";
import trash from "../../../assets/icons/delete.svg";
import actions_with_tasks from "../../../assets/icons/actions_with_tasks.svg";

const TaskList = () => {
	// функция с async ВСЕГДА возвращает Promise, даже если внутри есть return c данными.
	// Поэтому при вызове getTasks() мы получаем не данные, а Promise,
	// и чтобы получить сами данные — нужно использовать await или then.

	const tasks = useTaskStore((state) => state.tasks);
	const setTasks = useTaskStore((state) => state.setTasks);
	const toggleTask = useTaskStore((state) => state.toggleTask);
	const deleteTask = useTaskStore((state) => state.deleteTask);
	const search = useTaskStore((state) => state.search);
	const filter = useTaskStore((state) => state.filter);

	const [activeActionId, setActiveActionId] = useState<string>("");

	useEffect(() => {
		const loadTasks = async () => {
			const getData = await getTasks();
			setTasks(getData);
		};

		loadTasks();
	}, []);

	if (tasks == null) {
		return <div>Loading...</div>;
	}

	if (tasks.length === 0) {
		return <div>Список задач пуст</div>;
	}

	const tasksAfterSearch = tasks.filter((task) =>
		task.title.toLowerCase().includes(search.toLowerCase()),
	);

	const tasksAfterFilter = tasksAfterSearch.filter((task) =>
		filter === "allTasks" ? task : task.status === filter,
	);

	return (
		<div className='tasklist'>
			{tasksAfterFilter.map(
				({ id, title, description, priority, status, time, labels }) => {
					return (
						<div
							key={id}
							className={`tasklist__item ui-fade-outline ${status} ${priority}`}>
							<div className='flex items-start gap-2'>
								<button
									onClick={() => toggleTask(id)}
									className='tasklist__btn-done'
								/>

								<div>
									<h4 className='tasklist__title'>{title}</h4>
									{description ? (
										<p className='tasklist__descr'>{description}</p>
									) : null}

									{time ? (
										<div className='tasklist__label-list'>
											<p className='tasklist__time ui-btn ui-btn--primary'>
												{time}
											</p>
											{labels?.map((label, i) => (
												<span
													key={`${label}-${i}`}
													className='tasklist__label-item'>
													{label}
												</span>
											))}
										</div>
									) : null}
								</div>
							</div>
							<div className='flex items-center pr-3 relative'>
								<img
									onClick={() =>
										setActiveActionId((prevId) => (prevId === id ? "" : id))
									}
									src={actions_with_tasks}
								/>
							</div>
							{activeActionId === id && (
								<div className='absolute right-15 top-[50%] translate-y-[-50%] flex gap-2'>
									<button className='flex gap-2 p-0 items-center'>
										<img
											className='rounded-full px-3 py-2 bg-low'
											src={edit}
										/>
									</button>
									<button
										onClick={() => deleteTask(id)}
										className='flex gap-2 items-center'>
										<img
											className='rounded-full px-3 py-2 bg-high'
											src={trash}
										/>
									</button>
								</div>
							)}
						</div>
					);
				},
			)}
		</div>
	);
};

export default TaskList;
