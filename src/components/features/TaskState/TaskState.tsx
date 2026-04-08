import { useLayoutEffect, useRef, useState } from "react";

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

const TaskState = () => {
	const [activeState, setActiveState] = useState<TaskStateKey>("allTasks");
	const activeBtnRef = useRef<HTMLButtonElement | null>(null);
	
	const [indicatorStyle, setIndicatorStyle] = useState<{
		transform: string;
		width?: number;
	}>({
		transform: "translateX(-2px)",
	});

	function syncActiveBtnRef(el: HTMLButtonElement | null, key: TaskStateKey) {
		if (el && key === activeState) {
			activeBtnRef.current = el;
		}
	}

	useLayoutEffect(() => {
		const activeButton = activeBtnRef.current;

		if (!activeButton) {
			return;
		}

		setIndicatorStyle({
			transform: `translateX(${activeButton.offsetLeft - 2}px)`,
			width: activeButton.offsetWidth,
		});
	}, [activeState]);

	return (
		<section className='mt-5 flex justify-between'>
			<div className='relative inline-flex gap-0 rounded-full border p-0.5 border-slate-200 bg-slate-50/80'>
				{states.map(({ key, label }) => {
					return (
						<button
							key={key}
							onClick={() => setActiveState(key)}
							ref={(el) => syncActiveBtnRef(el, key)}
							className='ui-btn'>
							{label}
						</button>
					);
				})}

				<span
					className={`absolute z-1 ui-btn ui-btn--dark bg-transparent h-[calc(100%-4px)] w-32`}
					style={indicatorStyle}></span>
			</div>
			<button className='ui-btn ui-btn--dark'>+</button>
		</section>
	);
};

export default TaskState;
