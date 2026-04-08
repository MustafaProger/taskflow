import fingerprint from "../../../assets/icons/fingerprint-fill.svg";
import "./Header.css";

const Header = () => {
	return (
		<header className='mb-5 flex items-center justify-between'>
			<div className='logo-group flex min-w-0 items-center gap-3.5'>
				<span className='logo-badge grid size-[52px] place-items-center rounded-full border border-slate-200 bg-white text-[1.35rem] font-extrabold text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-250 hover:text-primary'>
					✓
				</span>
				<h1 className='typing-effect text-[20px] sm:text-4xl m-0 leading-[0.95] font-extrabold tracking-[-0.05em]'>
					Таскер от Мустафы
				</h1>
			</div>
			<button className='ui-btn ui-btn--primary flex gap-1'>
				<img
					src={fingerprint}
					alt='отпечаток пальца'
				/>
			</button>
		</header>
	);
};

export default Header;
