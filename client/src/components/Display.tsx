import { useTimerStore } from "../store";

export function Display() {
	const { isRunning, minutes, seconds, increaseMinutes, decreaseMinutes } =
		useTimerStore((state) => state);
	return (
		<div className="flex flex-col md:grid md:grid-cols-5 gap-3">
			<p className="md:col-span-4 text-center text-6xl sm:text-[10rem]">
				{minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}
			</p>
			<div className="flex justify-around gap-6 md:flex-col md:col-start-5  pt-8 md:pt-0">
				<button
					className="btn sm:h-16 flex-grow"
					disabled={isRunning && minutes !== 0 && seconds !== 0}
					onClick={(e) => {
						e.preventDefault();
						increaseMinutes();
					}}
				>
					Up
				</button>
				<button
					className="btn sm:h-16 flex-grow"
					disabled={isRunning && minutes !== 0 && seconds !== 0}
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
