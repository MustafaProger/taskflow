type AddOrEditTaskProps = {
	className?: string;
	children: React.ReactNode;
};

const AddOrEditTask = ({ className, children }: AddOrEditTaskProps) => {
	return (
		<button className={`ui-btn ui-btn--secondary ${className ?? ""}`}>
			{children}
		</button>
	);
};

export default AddOrEditTask;
