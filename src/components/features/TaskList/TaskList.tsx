import { useEffect, useState } from "react";
import type { Task } from "../../../types/task";
import { getTasks } from "../../../api/tasks";
import "./TaskList.css";

import edit from "../../../assets/icons/edit.svg";
import trash from "../../../assets/icons/delete.svg";

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

	function doneTask(id: number) {
		setTaskList((prevTaskList) => {
			if (prevTaskList === null) return null;

			return prevTaskList.map((task) => {
				if (task.id !== id) {
					return task;
				}

				return {
					...task,
					status: task.status === "active" ? "done" : "active",
				};
			});
		});
	}

	function deleteTask(id: number) {
		return setTaskList((prevState) => {
			if (prevState === null) return null;

			return prevState.filter((task) => task.id !== id);
		});
	}

	if (taskList == null) {
		return <div>Loading...</div>;
	}

	if (taskList.length === 0) {
		return <div>Список задач пуст</div>;
	}

	return (
		<div className='py-3'>
			{taskList.map(
				({ id, title, description, priority, status, time, labels }) => {
					return (
						<div
							key={id}
							className={`tasklist__container ui-fade-outline justify-between ${status} ${priority}`}>
							<div className='flex items-start justify-between gap-2'>
								<button
									onClick={() => doneTask(id)}
									className='tasklist__btn-done'
								/>

								<div>
									<h3 className='tasklist__title'>{title}</h3>
									{description ? (
										<p className='tasklist__descr'>{description}</p>
									) : null}

									{labels?.length ? (
										<div className='tasklist__label-list'>
											{labels.map((label, i) => (
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
							<div className='flex shrink-0 items-center justify-end gap-2'>
								{time ? (
									<p className='ui-btn ui-btn--primary font-light text-xs'>
										{time}
									</p>
								) : null}

								<button className='ui-btn py-3 px-4 bg-secondary'>
									<img src={edit} />
								</button>
								<button
									onClick={() => deleteTask(id)}
									className='ui-btn py-3 px-4 bg-high'>
									<img src={trash} />
								</button>
							</div>
						</div>
					);
				},
			)}
		</div>
	);
};

export default TaskList;
