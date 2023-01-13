import { useEffect, useState } from "react";

import { useTimerStore } from "../store";
import { queryClient } from "../main";

export function ButtonPanel({
	category,
	setDuration,
	setStartTime,
	setCategory,
}: {
	category: string;
	setDuration: React.Dispatch<React.SetStateAction<number>>;
	setStartTime: React.Dispatch<React.SetStateAction<Date>>;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
	const { minutes, isRunning, hasStarted, toggleIsRunning, reset } =
		useTimerStore((state) => state);

	const fakeCategories = ["work", "reading", "coding", "break"];
	useEffect(() => {
		setCategory(fakeCategories[0]);
	}, [])

	return (
		<div className="flex justify-between gap-3 sm:grid sm:grid-cols-5">
			{fakeCategories.map((c, i) => {
				return (
					<button
						key={i}
						className={`flex gap-2 align-center btn ${
							category === c ? "btn-accent" : "btn-ghost"
						}`}
						onClick={() => {
							setCategory(c);
						}}
					>
						{c}
					</button>
				);
			})}
			<div className={`${isRunning && "btn-group"} sm:col-start-5`}>
				<button
					className={`btn ${isRunning ? "btn-warning" : "btn-success w-full"}`}
					onClick={() => {
						if (!hasStarted) {
							setDuration(minutes);
							setStartTime(new Date());
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
