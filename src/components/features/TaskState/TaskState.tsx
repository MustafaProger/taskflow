import { useLayoutEffect, useRef, useState } from "react";
import "./TaskState.css";

type TaskStateKey = "allTasks" | "active" | "done";

type TaskStateType = {
	key: TaskStateKey;
	label: string;
};

const states: TaskStateType[] = [
	{ key: "allTasks", label: "Все задачи" },
	{ key: "active", label: "Активные" },
	{ key: "done", label: "Выполненные" },
];

/*
	Как работает этот компонент очень простым языком:

	1. Пользователь кликает по кнопке.
	2. onClick вызывает setActiveState(key).
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
	клик -> новый activeState -> render -> DOM update -> ref на новой кнопке
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
const TaskState = () => {
	const [activeState, setActiveState] = useState<TaskStateKey>("allTasks");
	const activeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [isIndicatorMoving, setIsIndicatorMoving] = useState(false);

	const [indicatorStyle, setIndicatorStyle] = useState<{
		transform: string;
		width?: number;
	}>({
		transform: "translateX(0)",
	});

	function syncActiveBtnRef(el: HTMLButtonElement | null, key: TaskStateKey) {
		if (el && key === activeState) {
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
	}, [activeState]);

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
		<section className='mt-5 flex justify-between gap-4'>
			<div className='relative inline-flex gap-0 rounded-full border border-white/10 bg-white/[0.04] p-0.5'>
				{states.map(({ key, label }) => {
					return (
						<button
							key={key}
							onClick={() => setActiveState(key)}
							ref={(el) => syncActiveBtnRef(el, key)}
							className={`z-1 ui-btn ${
								key === activeState ? "text-text" : "text-white/65 hover:text-text"
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
		</section>
	);
};

export default TaskState;
