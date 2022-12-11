import { useState } from "react";

export function Display({ isRunning }: Props) {

	return (
		<div className="flex flex-col md:grid md:grid-cols-5">
            <p className="md:col-span-4 text-center text-6xl sm:text-[10rem]">00:00</p>
            <div className="flex md:flex-col justify-around pt-8 md:pt-0">
                <button onClick={e => {
                    e.preventDefault()
                }}>Up</button>
                <button onClick={e => {
                    e.preventDefault()
                }}>Down</button>
            </div>
		</div>
	);
}

interface Props {
    isRunning: Boolean
}