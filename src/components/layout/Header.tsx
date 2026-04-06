import GlassSurface from "../ui/GlassSurface";

const Header = () => {
	return (
		<div className='flex justify-between items-center pb-5'>
			<div className='flex gap-2 items-center'>
				<GlassSurface>
					<span className='px-3 py-2 text-3xl text-primary'>✓</span>
				</GlassSurface>
				<h1 className='text-title font-bold'>Taskflow</h1>
			</div>
			<div>
				<GlassSurface>
					<button className='font-bold'>Войти</button>
				</GlassSurface>
			</div>
		</div>
	);
};

export default Header;
