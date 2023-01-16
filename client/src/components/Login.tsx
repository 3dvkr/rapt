import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient, loginPath } from "../main";
export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: async function (credentials: {
			username: string;
			password: string;
		}) {
			const res = await fetch("/api/login", {
				body: JSON.stringify(credentials),
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

		onSettled: (data, e) => {
			const error = e as { message: string };
			queryClient.invalidateQueries({ queryKey: ["currentUser"] }).then(() => {
				if (!error) {
					navigate("/" + loginPath + "/timer");
				} else {
					setErrors(error.message);
				}
			});
		},
		retry: 2,
	});

	const loginHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate({
			username,
			password,
		});
	};
	return (
		<div className="card w-96 bg-base-100 shadow-xl mx-auto p-2">
			<div className="card-body">
				<form onSubmit={loginHandler}>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<label className="input-group input-group-vertical">
							<span>Username</span>
							<input
								type="text"
								className="input input-bordered"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</label>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<label className="input-group input-group-vertical">
							<span>Password</span>
							<input
								type="password"
								className="input input-bordered"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
					</div>
					{errors && <p>{errors}</p>}
					<button className="btn btn-active btn-accent block my-2 ml-auto">
						Log in
					</button>
				</form>
			</div>
		</div>
	);
}
