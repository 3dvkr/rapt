import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loginPath, queryClient } from "../main";
export function Header() {
	const {
		isLoading,
		error,
		data: user,
	} = useQuery({
		queryKey: ["currentUser"],
		queryFn: () => fetch("/api/get-user").then((res) => res.json()),
	});

	const logoutHandler = () => {
		fetch("/api/logout", {
			method: "GET",
		})
			.then((res) => res.json())
			.then(() => queryClient.invalidateQueries());
	};
	return (
		<header>
			<nav className="navbar bg-base-100">
				<div className="flex-1">
					<Link
						to={!user || isLoading ? "/" : loginPath + "/timer"}
						className="btn btn-ghost normal-case text-xl"
					>
						Rapt
					</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						{user && (
							<li>
								<Link to={loginPath + "/dashboard"}>Dashboard</Link>
							</li>
						)}
						{!user && (
							<>
								<li>
									<Link to="/sign-up">Sign up</Link>
								</li>
								<li>
									<Link to="/login">Log in </Link>
								</li>
							</>
						)}
						{user && (
							<li>
								<button onClick={logoutHandler}>Logout</button>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
}
