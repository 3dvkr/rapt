import { useTimerStore } from "../store";
import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";
import { SessionSubmissionForm } from "./SessionSubmissionForm";
import { useEffect, useState } from "react";

const intervalTime: number = process.env.NODE_ENV === 'production' ? 1000 : 50;
export function Timer() {
	const {
		isRunning,
		canSubmit,
		setCanSubmit,
		minutes,
		seconds,
		countdown,
		reset,
	} = useTimerStore((state) => state);
	const [duration, setDuration ] = useState<number>(0)
	const [startTime, setStartTime ] = useState<Date>(new Date)
	const [category, setCategory ] = useState<string>("")
	useEffect(() => {
		let interval: NodeJS.Timer;
		if (isRunning) {
			interval = setInterval(countdown, intervalTime);
			if (minutes === 0 && seconds === 0) {
				console.log("clearing interval");
				reset();
				clearInterval(interval);
				setCanSubmit(true);
			}
		}
		return () => clearInterval(interval);
	}, [isRunning, minutes, seconds, countdown]);
	return (
		<div className="flex flex-col justify-around h-full">
			<Display />
			<div className="flex flex-col gap-4">
				{canSubmit && <SessionSubmissionForm duration={duration} startTime={startTime} category={category} />}
				<ButtonPanel category={category} setDuration={setDuration} setStartTime={setStartTime} setCategory={setCategory} />
			</div>
		</div>
	);
}
