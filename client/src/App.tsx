import { useState } from "react";
import {
	useQuery,
} from "@tanstack/react-query";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function App() {
	const path = useLocation();
	// const [user, setUser] = useState(true);

	const {
		isLoading,
		error,
		data: user,
	} = useQuery({
		queryKey: ["userData"],
		queryFn: () =>
			fetch("/api/login", {
				body: JSON.stringify({
					username: "test1",
					password: "test1",
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			}).then((res) => res.json()),
	});
	console.log("oh hi ", { user });

	if (isLoading) console.log("loading...");
	if (error) console.log(error);
	if (!isLoading && !user && path.pathname !== "/") {
		return <Navigate to="/" />;
	}

	return (
		<div className="container mx-auto flex flex-col h-screen">
			<Header />
			<div className="flex-grow">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default App;
