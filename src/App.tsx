import TaskToolbar from "./components/features/TaskToolbar";
import Header from "./components/layout/Header";
import GlassSurface from "./components/ui/GlassSurface";

function App() {
	return (
		<div className='p-container max-w-200 m-auto pt-10'>
			<Header />
			<GlassSurface
				wrapClassName='container-for-tasks w-full'
				surfaceClassName='w-full px-1 py-4'>
				<TaskToolbar />
			</GlassSurface>
		</div>
	);
}

export default App;
