import { useTimerStore } from "../store";
import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";
import { SessionSubmissionForm } from "./SessionSubmissionForm";
import { useState } from "react";

export function Timer() {
	const canSubmit = useTimerStore((state) => state.canSubmit);
	const [category, setCategory ] = useState<string>("");
	return (
		<div className="flex flex-col justify-around h-full">
			<Display />
			<div className="flex flex-col gap-4">
				{canSubmit && <SessionSubmissionForm category={category} />}
				<ButtonPanel category={category} setCategory={setCategory} />
			</div>
		</div>
	);
}
