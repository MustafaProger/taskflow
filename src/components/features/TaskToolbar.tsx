import { useState } from "react";
import magnifier from "../../assets/icons/magnifier.svg";

const TaskToolbar = () => {

	const [search, setSearch] = useState<string>("");

	return (
		<section className='flex w-full min-w-0 flex-wrap items-center gap-3'>
			<div className='group flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white/[0.08] px-3.5 py-3 transition-all duration-150 focus-within:bg-white/[0.11]'>
				<img
					className='size-[18px] shrink-0 opacity-85'
					src={magnifier}
					alt='лупа'
				/>
				<input
					id='searchTask'
					onChange={(e) => setSearch(e.currentTarget.value)}
					value={search}
					type='search'
					placeholder='Поиск задачи...'
					className='w-full min-w-0 bg-transparent p-0 text-[1.02rem] tracking-[-0.01em] text-white placeholder:text-white/45 focus:outline-none'
				/>
			</div>
		</section>
	);
};

export default TaskToolbar;
