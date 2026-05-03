import { useState } from "react";
import { useTaskStore } from "../../../store/taskStore";
import "./AddTaskWindow.css";
import type { Task } from "../../../types/task";

// Функция для создания "черновой" (пустой) задачи
// Используется для инициализации формы и её сброса
function createDraftTask(): Task {
	return {
		id: "",
		title: "",
		description: "",
		status: "active",
		priority: "low",
		time: "",
		labels: [],
	};
}

const AddTaskWindow = () => {
	const isOpen = useTaskStore((state) => state.isAddTaskOpen);
	const setIsAddTaskClose = useTaskStore((state) => state.setIsAddTaskClose);
	const setAddTask = useTaskStore((state) => state.setAddTask);

	// useState с "ленивой инициализацией"
	// мы НЕ вызываем функцию, а просто передаем ее → React вызовет её ОДИН раз
	const [task, setTask] = useState<Task>(createDraftTask);

	const { title, description } = task;

	return (
		<div
			onClick={() => setIsAddTaskClose(false)}
			className={`add-task ${isOpen ? "opened" : ""}`}>
			<div
				onClick={(e) => e.stopPropagation()}
				className='ui-fade-outline add-task__container'>
				<input
					type='text'
					className='add-task__title'
					placeholder='Название'
					required
					value={title}
					onChange={(e) =>
						setTask((prevState) => ({
							...prevState,
							title: e.target.value,
						}))
					}
				/>

				<input
					type='text'
					className='add-task__descr'
					placeholder='Описание'
					value={description}
					onChange={(e) =>
						setTask((prevState) => ({
							...prevState,
							description: e.target.value,
						}))
					}
				/>

				<button
					className='ui-btn ui-btn--secondary add-task__button'
					disabled={!title.trim()}
					onClick={() => {
						// создаём новую задачу:
						// - берём всё из task
						// - генерируем новый уникальный id
						setAddTask({
							...task,
							id: crypto.randomUUID(),
						});

						// сбрасываем форму в исходное состояние
						setTask(createDraftTask());
					}}>
					Добавить
				</button>
			</div>
		</div>
	);
};

export default AddTaskWindow;
