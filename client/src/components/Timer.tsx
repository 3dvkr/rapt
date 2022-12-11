import { useTimerStore } from "../store";
import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";

export function Timer() {
	const { isRunning, toggleIsRunning } = useTimerStore((state) => state);
	return (
		<div className="flex flex-col justify-around h-full">
			<Display />
			<ButtonPanel />
		</div>
	);
}
