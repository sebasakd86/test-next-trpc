const Loading = () => {
	return (
		<div className="modal modal-open text-center" id="modal-loading">
			<div className="modal-box space-y-2 max-w-xs">
				<h3 className="font-bold text-lg">Loading</h3>
				<div
					className="radial-progress text-primary"
					style={{ "--value": 70 }}
				>
					70%
				</div>
			</div>
		</div>
	);
};

export default Loading;
