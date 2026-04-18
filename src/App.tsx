import TaskList from "./components/features/TaskList/TaskList";
import TaskFilter from "./components/features/TaskFilter/TaskFilter";
import TaskToolbar from "./components/features/TaskToolbar";
import Header from "./components/layout/Header/Header";

function App() {
	return (
		<main className='mx-auto w-full max-w-[1120px] min-w-[320px] px-[clamp(5px,4vw,30px)] pb-[72px] pt-[clamp(15px,4vw,56px)]'>
			<Header />
			<section className='ui-fade-outline rounded-[28px] bg-bg-container p-[clamp(5px,4vw,24px)] backdrop-blur-xl'>
				<TaskToolbar />
				<TaskFilter />
				<TaskList />
			</section>
		</main>
	);
}

export default App;
