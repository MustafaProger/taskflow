type GlassSurfaceProps = {
	children: React.ReactNode;
	wrapClassName?: string;
	surfaceClassName?: string;
};

const GlassSurface = ({
	children,
	wrapClassName = "",
	surfaceClassName = "",
}: GlassSurfaceProps) => {

	return (
		<div className={`glass-wrap ${wrapClassName}`}>
			<div className={`glass-surface ${surfaceClassName}`}>{children}</div>
			<div className='glass-shadow' />
		</div>
	);
};

export default GlassSurface;
