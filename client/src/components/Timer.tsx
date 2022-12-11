import { useState } from "react";

import { Display } from "./Display";
import {ButtonPanel} from "./ButtonPanel"

export function Timer() {
	const [isRunning, setIsRunning] = useState(false);
	return (
		<div className="flex flex-col justify-around h-full">
			<Display isRunning={isRunning} />
			<ButtonPanel isRunning={isRunning} setIsRunning={setIsRunning} />
		</div>
	);
}