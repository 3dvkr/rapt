import React, { useReducer } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTimerStore } from "../store";

interface FormState {
	memo: string;
	category: string;
	duration: number;
	startTime: Date;
}
interface FormAction {
	type: "UPDATE_MEMO" | "UPDATE_CATEGORY" | "CLEAR";
	payload: string;
}

const formReducer: React.Reducer<FormState, FormAction> = (
	prevState,
	action
) => {
	const { type, payload } = action;
	switch (type) {
		case "UPDATE_MEMO":
			return { ...prevState, memo: payload };
		default:
			return prevState;
	}
};

const initFormState = {
	memo: "",
	category: "",
	duration: 0,
	startTime: new Date(),
};

export function SessionSubmissionForm({ category }: { category: string }) {
	const { data: username } = useQuery({
		queryKey: ["currentUser"],
		queryFn: () => fetch("/api/get-user").then((res) => res.json()),
	});
	const {
		setCanSubmit,
		duration,
		start: startTime,
	} = useTimerStore((state) => state);
	const [state, dispatch] = useReducer(formReducer, initFormState);
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCanSubmit(false);
	};

	const { mutate } = useMutation({
		mutationFn: async function (timerSession: {
			startTime: Date;
			duration: number;
			category: string;
			memo: string;
			username: string;
		}) {
			const res = await fetch("/api/timers", {
				body: JSON.stringify(timerSession),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(json.message);
			}
			return json;
		},
	});

	const sessionSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate({
			startTime,
			duration,
			category,
			memo: state.memo,
			username: username.data,
		});
		setCanSubmit(false);
	};

	return (
		<form className="form-control w-full grid grid-cols-5 gap-1 sm:gap-3" onSubmit={sessionSubmitHandler}>
			<div className="input-group col-span-4">
				<label htmlFor="memo" className="label bg-gray-600 px-4 text-white">Memo</label>
				<input
					type="text"
					id="memo"
					placeholder="(optional)"
					className="input input-bordered w-full max-w-xs"
					value={state.memo}
					onChange={(e) =>
						dispatch({
							type: "UPDATE_MEMO",
							payload: e.target.value,
						})
					}
				/>
			</div>
			<button className="btn col-start-5">Submit</button>
		</form>
	);
}
