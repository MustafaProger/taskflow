import TaskList from "./components/features/TaskList/TaskList";
import TaskState from "./components/features/TaskState/TaskState";
import TaskToolbar from "./components/features/TaskToolbar";
import Header from "./components/layout/Header/Header";

function App() {
	return (
		<main className='mx-auto w-full max-w-[1120px] min-w-[576px] px-[clamp(18px,4vw,36px)] pb-[72px] pt-[clamp(24px,4vw,56px)]'>
			<Header />
			<section className='ui-fade-outline rounded-[28px] bg-bg-container p-[24px] backdrop-blur-xl'>
				<TaskToolbar />
				<TaskState />
				<TaskList />
			</section>
		</main>
	);
}

export default App;
