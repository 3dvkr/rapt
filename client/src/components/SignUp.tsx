import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
export function SignUp() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const {
		mutate,
	} = useMutation({
		mutationFn: (credentials: { email: string, username: string; password: string }) => {
			return fetch("/api/sign-up", {
				body: JSON.stringify(credentials),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["currentUser"] }).then(() => {
				navigate("/timer");
			});
		},
		retry: 2,
	});

	const loginHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			console.log({password, confirmPassword})
			return
		} else {
			mutate({
				email,
				username,
				password,
			});
		}
	};
	return (
		<div className="card w-96 bg-base-100 shadow-xl mx-auto p-2">
			<div className="card-body">
				<form>
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
							<span className="label-text">Your Email</span>
						</label>
						<label className="input-group input-group-vertical">
							<span>Email</span>
							<input
								type="email"
								className="input input-bordered"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
					<div className="form-control">
						<label className="label">
							<span className="label-text">Confirm Password</span>
						</label>
						<label className="input-group input-group-vertical">
							<span>Confirm Password</span>
							<input
								type="password"
								className="input input-bordered"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</label>
					</div>
				</form>
			</div>
		</div>
	);
}
