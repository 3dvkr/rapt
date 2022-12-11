import { useTimerStore } from "../store";
import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";
import { useEffect } from "react";

export function Timer() {
	const { isRunning, toggleIsRunning, minutes, seconds, countdown } =
		useTimerStore((state) => state);
	useEffect(() => {
		let interval: NodeJS.Timer;
		if (isRunning) {
			interval = setInterval(countdown, 100);
			if (minutes === 0 && seconds === 0) {
				toggleIsRunning();
				clearInterval(interval);
			}
		}
		return () => clearInterval(interval);
	}, [isRunning, minutes, seconds, countdown]);
	return (
		<div className="flex flex-col justify-around h-full">
			<Display />
			<ButtonPanel />
		</div>
	);
}
