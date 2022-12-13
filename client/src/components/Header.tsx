import { Link } from "react-router-dom";
import {
	useMutation,
} from "@tanstack/react-query";
import { queryClient } from "../main";
export function Header() {
	const {
		mutate,
		isLoading,
		data: loginData,
	} = useMutation({
		mutationFn: (credentials: { username: string; password: string }) => {
			return fetch("/api/login", {
				body: JSON.stringify(credentials),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
		},
	});

	const loginHandler = () => {
		mutate({
			username: "test1",
			password: "test1",
		});
	};
	const logoutHandler = () => {
		fetch("/api/logout", {
			method: "GET",
		})
			.then((res) => res.json())
			.then(() => queryClient.invalidateQueries());
	};
	console.log({loginData})
	return (
		<header>
			<nav className="navbar bg-base-100">
				<div className="flex-1">
					<Link
						to={!loginData || isLoading ? "/" : "/timer"}
						className="btn btn-ghost normal-case text-xl"
					>
						Rapt
					</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						<li>
							<button onClick={loginHandler}>Login</button>
						</li>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
