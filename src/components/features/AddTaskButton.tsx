import { useTaskStore } from "../../store/taskStore";

type AddTaskButtonProps = {
	className?: string;
	children: React.ReactNode;
};

const AddTaskButton = ({ className, children }: AddTaskButtonProps) => {
	const setIsAddTaskOpen = useTaskStore((state) => state.setIsAddTaskOpen);

	return (
		<button
			onClick={() => setIsAddTaskOpen(true)}
			className={`ui-btn ui-btn--secondary ${className ?? ""}`}>
			{children}
		</button>
	);
};

export default AddTaskButton;
