import React from "react";
import { useState } from "react";

import { useTimerStore } from "../store";

export function ButtonPanel() {
	const { isRunning, toggleIsRunning, reset } = useTimerStore((state) => state);

	const fakeCategories = ["work", "reading", "coding", "break"];
	const [category, setCategory] = useState(fakeCategories[0]);

	const runToggle = (e: React.MouseEvent) => {
		e.preventDefault();
		toggleIsRunning();
	};

	return (
		<div className="flex gap-3 md:grid md:grid-cols-5">
			{fakeCategories.map((c, i) => {
				return (
					<button
						key={i}
						className={`flex gap-2 align-center btn ${
							category === c ? "btn-accent" : "btn-ghost"
						}`}
						onClick={(e) => {
							e.preventDefault();
							setCategory(c);
						}}
					>
						{c}
					</button>
				);
			})}
			<div className={`ml-auto  ${isRunning && "btn-group"}`}>
				<button
					className={`btn ${isRunning ? "btn-warning" : "btn-success"}`}
					onClick={runToggle}
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

interface Props {
	isRunning: Boolean;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
