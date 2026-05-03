import { useEffect, useRef, useState } from "react";
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
	const titleRef = useRef<null | HTMLInputElement>(null);
	const [titleForMessanger, setTitleForMessanger] = useState<string>("");

	// Это нужно, чтобы при быстром добавлении задач у нас не марасило сообщение об добавленной задаче
	const [messengerKey, setMessangerKey] = useState<number>(0);

	// useState с "ленивой инициализацией"
	// мы НЕ вызываем функцию, а просто передаем ее → React вызовет её ОДИН раз
	const [task, setTask] = useState<Task>(createDraftTask);

	const { title, description } = task;

	function focusOnTitle() {
		titleRef.current?.focus();
	}

	function actionsAfterAddTask() {
		// создаём новую задачу:
		// - берём всё из task
		// - генерируем новый уникальный id
		setTitleForMessanger(title);
		setAddTask({
			...task,
			id: crypto.randomUUID(),
		});

		// сбрасываем форму в исходное состояние
		setTask(createDraftTask());
		focusOnTitle();
		setMessangerKey((prev) => prev + 1);
	}

	useEffect(() => {
		if (titleForMessanger) {
			const timer = setTimeout(() => {
				setTitleForMessanger("");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [titleForMessanger]);

	useEffect(() => {
		if (isOpen) {
			focusOnTitle();
		}
	}, [isOpen]);

	return (
		<div
			onClick={() => setIsAddTaskClose(false)}
			className={`add-task ${isOpen ? "opened" : ""}`}>
			<div
				// Тут добавили ключ, чтобы каждый раз React обновлял эту часть при добавлении задач, менее чем за 3 секунды
				key={messengerKey}
				className={`add-task__messanger ui-fade-outline ${titleForMessanger ? "active" : null}`}>
				Задача «
				{titleForMessanger.length > 10
					? titleForMessanger.slice(0, 10) + "..."
					: titleForMessanger}
				» добавлена
				<span className='add-task__messanger-line' />
			</div>
			<div
				onClick={(e) => e.stopPropagation()}
				className='ui-fade-outline add-task__container'>
				<input
					type='text'
					className='add-task__title'
					placeholder='Название'
					required
					ref={titleRef}
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
					onClick={actionsAfterAddTask}>
					Добавить
				</button>
			</div>
		</div>
	);
};

export default AddTaskWindow;
