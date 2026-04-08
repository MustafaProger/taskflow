import TaskState from "./components/features/TaskState/TaskState";
import TaskToolbar from "./components/features/TaskToolbar";
import Header from "./components/layout/Header/Header";

function App() {
	return (
		<main className='mx-auto w-full max-w-[1120px] min-w-[320px] px-[clamp(18px,4vw,36px)] pb-[72px] pt-[clamp(24px,4vw,56px)]'>
			<Header />
			<section className='rounded-[24px] border border-slate-200 bg-white p-[24px] shadow-[0_2px_4px_rgba(15,23,42,0.06),0_18px_42px_rgba(15,23,42,0.10)]'>
				<TaskToolbar />
				<TaskState />
			</section>
		</main>
	);
}

export default App;
