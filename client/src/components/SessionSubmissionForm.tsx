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

export function SessionSubmissionForm({
	category,
}: {
	category: string;
}) {
	const {
		data: username,
	} = useQuery({
		queryKey: ["currentUser"],
		queryFn: () => fetch("/api/get-user").then((res) => res.json()),
	});
	const { setCanSubmit, duration, start:startTime } = useTimerStore((state) => state);
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
		<form onSubmit={sessionSubmitHandler}>
			<label>
				Memo (optional): {}
				<input
					type="text"
					value={state.memo}
					onChange={(e) =>
						dispatch({
							type: "UPDATE_MEMO",
							payload: e.target.value,
						})
					}
				/>
			</label>
			<button>Submit</button>
		</form>
	);
}
