import fingerprint from "../../../assets/icons/fingerprint-fill.svg";
import "./Header.css";

const Header = () => {
	return (
		<header className='mb-5 flex items-center justify-between'>
			<div className='logo-group flex min-w-0 items-center gap-3.5'>
				<span className='ui-btn ui-btn--primary grid size-[clamp(44px,10vw,52px)] place-items-center rounded-full text-[1.35rem] font-extrabold text-text p-0 transition-all duration-250 hover:text-secondary'>
					✓
				</span>
				<h1 className='typing-effect sm:text-4xl'>Таскер от Мустафы</h1>
			</div>
			<button className='ui-btn ui-btn--secondary'>
				<img
					src={fingerprint}
					alt='отпечаток пальца'
				/>
			</button>
		</header>
	);
};

export default Header;
