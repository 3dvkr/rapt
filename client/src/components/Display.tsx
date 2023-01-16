import { useEffect } from "react";
import { useTimerStore } from "../store";

const intervalTime: number = process.env.NODE_ENV === 'production' ? 1000 : 50;

export function Display() {
	const { isRunning, minutes, seconds, countdown, hasStarted, setCanSubmit, reset, increaseMinutes, decreaseMinutes } =
		useTimerStore((state) => state);
	useEffect(() => {
		let interval: NodeJS.Timer;
		if (isRunning) {
			interval = setInterval(countdown, intervalTime);
			if (minutes === 0 && seconds === 0) {
				reset();
				clearInterval(interval);
				setCanSubmit(true);
			}
		}
		return () => clearInterval(interval);
	}, [isRunning, minutes, seconds, countdown]);
	return (
		<div className="flex flex-col md:grid md:grid-cols-5 gap-3">
			<p className="md:col-span-4 text-center text-6xl sm:text-[10rem]">
				{minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}
			</p>
			<div className="flex justify-around gap-6 md:flex-col md:col-start-5 pt-8 md:pt-0">
				<button
					className="btn sm:h-16 flex-grow"
					disabled={hasStarted}
					onClick={(e) => {
						e.preventDefault();
						increaseMinutes();
					}}
				>
					Up
				</button>
				<button
					className="btn sm:h-16 flex-grow"
					disabled={hasStarted}
					onClick={(e) => {
						e.preventDefault();
						decreaseMinutes();
					}}
				>
					Down
				</button>
			</div>
		</div>
	);
}
