import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { useTimerStore } from "../store";

export function ButtonPanel({
	category,
	setCategory,
}: {
	category: string;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
	const { isRunning, hasStarted, setSessionInfo, toggleIsRunning, reset } =
		useTimerStore(
			(state) => ({
				isRunning: state.isRunning,
				hasStarted: state.hasStarted,
				setSessionInfo: state.setSessionInfo,
				toggleIsRunning: state.toggleIsRunning,
				reset: state.reset,
			}),
			shallow
		);

	const fakeCategories = ["work", "reading", "coding", "break"];
	useEffect(() => {
		setCategory(fakeCategories[0]);
	}, []);

	return (
		<div className="gap-3 grid grid-cols-3 sm:grid-cols-5">
			<div className="col-span-2 sm:col-span-4 grid gap-x-6 gap-y-2 grid-cols-2 sm:grid-cols-4">
				{fakeCategories.map((c, i) => {
					return (
						<button
							key={i}
							className={`btn ${category === c ? "btn-accent" : "btn-ghost"}`}
							onClick={() => {
								setCategory(c);
							}}
						>
							{c}
						</button>
					);
				})}
			</div>
			<div className={`${isRunning && "btn-group"} col-start-3 sm:col-start-5 row-start-1`}>
				<button
					className={`btn ${isRunning ? "btn-warning" : "btn-success w-full"}`}
					onClick={() => {
						if (!hasStarted) {
							setSessionInfo();
						}
						toggleIsRunning();
					}}
				>
					{isRunning ? "Pause" : "Start"}
				</button>
				{isRunning && (
					<button className="btn top-0 right-0 rounded" onClick={reset}>
						X
					</button>
				)}
			</div>
		</div>
	);
}
