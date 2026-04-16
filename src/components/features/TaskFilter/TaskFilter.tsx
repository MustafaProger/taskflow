import { useLayoutEffect, useRef, useState } from "react";
import { useTaskStore } from "../../../store/taskStore";
import type { TaskFilterKey, TaskFilterType } from "../../../types/task";
import "./TaskFilter.css";

/*
	Как работает этот компонент очень простым языком:

	1. Пользователь кликает по кнопке.
	2. onClick вызывает setActiveFilter(key).
	3. Это не двигает индикатор сразу. React просто получает новые данные:
	   "теперь активна другая кнопка".
	4. React делает render:
	   заново вызывает компонент и получает новое описание интерфейса в JSX.
	   Здесь React еще не меняет настоящий DOM браузера.
	5. React сравнивает старое и новое описание интерфейса и понимает,
	   что именно изменилось.
	6. После этого React делает DOM update:
	   обновляет реальные элементы в браузере и заново привязывает ref
	   к той кнопке, которая теперь активна.
	7. Важно: ref работает только с реальным DOM-элементом.
	   Он не работает с "черновиком" JSX во время render.
	   Поэтому ref становится актуальным только после DOM update,
	   когда настоящая кнопка уже существует в браузере.
	8. UseLayoutEffect запускаются не в момент setState,
	   а после того, как React закончил DOM update.
	9. Когда DOM уже обновлен, запускается useLayoutEffect.
	   Здесь можно безопасно читать activeBtnRef.current и измерять кнопку.
	   То есть ref как будто "ждет", пока React закончит обновлять настоящий DOM.
	10. Мы берем:
	   - offsetLeft: насколько кнопка сдвинута слева внутри родителя
	   - offsetWidth: какая у кнопки ширина
	11. Эти значения кладем в indicatorStyle, чтобы подложка переехала
	   под нужную кнопку и стала нужной ширины.
	12. React делает еще один короткий цикл render -> DOM update уже для индикатора.
	13. Дальше видимое движение делает не React, а CSS transition:
	    браузер сам анимирует изменение transform и width.
	14. Когда движение по transform закончилось, срабатывает onTransitionEnd.
	15. Если закончился именно transform, снимаем isIndicatorMoving,
	    и индикатор возвращается в спокойное состояние.

	Короткая формула:
	клик -> новый activeFilter -> render -> DOM update -> ref на новой кнопке
	-> useLayoutEffect -> новые координаты индикатора -> CSS animation
	-> transition end -> isIndicatorMoving(false)

	Порядок после DOM update такой:
	1. React обновляет настоящий DOM.
	2. React привязывает ref к реальному элементу.
	3. React запускает useLayoutEffect.
	4. Браузер рисует кадр на экране.
	5. React запускает useEffect.

	Почему именно так:
	ref нужен для работы с настоящим DOM.
	useLayoutEffect тоже нужен для работы с настоящим DOM до показа кадра.
	Поэтому useLayoutEffect получает уже готовый ref.

	Главное различие:
	render = React пересчитывает, каким интерфейс должен быть
	DOM update = React реально меняет страницу в браузере
*/

const filters: TaskFilterType[] = [
	{ key: "allTasks", label: "Все задачи" },
	{ key: "active", label: "Активные" },
	{ key: "done", label: "Выполненные" },
];

const TaskFilter = () => {
	const activeFilter = useTaskStore((state) => state.filter);
	const setFilter = useTaskStore((state) => state.setFilter);

	const activeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [isIndicatorMoving, setIsIndicatorMoving] = useState(false);

	const [indicatorStyle, setIndicatorStyle] = useState<{
		transform: string;
		width?: number;
	}>({
		transform: "translateX(0)",
	});

	function syncActiveBtnRef(el: HTMLButtonElement | null, key: TaskFilterKey) {
		if (el && key === activeFilter) {
			activeBtnRef.current = el;
		}
	}

	// Здесь мы читаем уже обновленный DOM и измеряем новую активную кнопку
	// до того, как браузер покажет кадр на экране.
	useLayoutEffect(() => {
		const activeButton = activeBtnRef.current;

		if (!activeButton) {
			return;
		}

		setIndicatorStyle({
			transform: `translateX(${activeButton.offsetLeft}px)`,
			width: activeButton.offsetWidth,
		});

		setIsIndicatorMoving(true);
	}, [activeFilter]);

	function handleIndicatorTransitionEnd(
		event: React.TransitionEvent<HTMLSpanElement>,
	) {
		// transition может завершиться для transform, width и height.
		// Нам важно дождаться именно конца движения по transform.
		if (event.propertyName !== "transform") {
			return;
		}

		setIsIndicatorMoving(false);
	}

	return (
		<div className=' mt-5 flex justify-between gap-4'>
			<div className='ui-fade-outline relative inline-flex gap-0 rounded-full bg-bg-state p-0.5'>
				{filters.map(({ key, label }) => {
					return (
						<button
							key={key}
							onClick={() => setFilter(key)}
							ref={(el) => syncActiveBtnRef(el, key)}
							className={`z-1 ui-btn font-medium ${
								key === activeFilter
									? "text-text"
									: "text-white/65 hover:text-text"
							}`}>
							{label}
						</button>
					);
				})}

				<span
					className='task-state-indicator'
					style={indicatorStyle}
					onTransitionEnd={handleIndicatorTransitionEnd}>
					<span
						className={`task-state-indicator__inner ${
							isIndicatorMoving ? "task-state-indicator__inner--moving" : ""
						}`}></span>
				</span>
			</div>
			<button className='ui-btn ui-btn--secondary'>+</button>
		</div>
	);
};

export default TaskFilter;
