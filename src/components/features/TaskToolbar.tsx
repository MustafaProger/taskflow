import { useTaskStore } from "../../store/taskStore";
import magnifier from "../../assets/icons/magnifier.svg";
import AddTaskButton from "./AddTaskButton";

const TaskToolbar = () => {
	const search = useTaskStore((state) => state.search);
	const setSearch = useTaskStore((state) => state.setSearch);

	return (
		<div className='flex rounded-full w-full min-w-0 flex-wrap items-center gap-3'>
			<div className='group ui-fade-outline flex min-w-0 flex-1 items-center gap-1 screen-500:gap-3 rounded-full bg-bg-search px-3.5 py-2 screen-500:py-3 transition-all duration-150 focus-within:bg-white/9'>
				<img
					className='size-4 screen-500:size-[18px] shrink-0 opacity-85'
					src={magnifier}
					alt='лупа'
				/>
				<input
					id='searchTask'
					onChange={(e) => setSearch(e.currentTarget.value)}
					value={search}
					type='search'
					placeholder='Поиск задачи...'
					className='w-full ui-fade-outline min-w-0 bg-transparent p-0 text-sm screen-500:text-base tracking-[-0.01em] text-white placeholder:text-white/45 focus:outline-none'
				/>
			</div>
			<AddTaskButton className='sm:hidden'>+</AddTaskButton>
		</div>
	);
};

export default TaskToolbar;
