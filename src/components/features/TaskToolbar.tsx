import GlassSurface from "../ui/GlassSurface";
import magnifier from "../../assets/icons/magnifier.svg";

const TaskToolbar = () => {
	return (
		<div className='flex w-full min-w-0 items-center gap-3'>
			<GlassSurface
				wrapClassName='flex-1 min-w-0'
				surfaceClassName='w-full'>
				<div className='relative w-full min-w-0 p-0'>
					<img
						className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2'
						src={magnifier}
						alt='лупа'
					/>
					<input
						id='searchTask'
						type='search'
						placeholder='Поиск задачи...'
						className='block w-full min-w-0 p-[9px_20px] pl-12'
					/>
				</div>
			</GlassSurface>
			<GlassSurface wrapClassName='shrink-0'>
				<button className='font-bold whitespace-nowrap'>+ Задача</button>
			</GlassSurface>
		</div>
	);
};

export default TaskToolbar;
