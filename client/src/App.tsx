import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";

function App() {
	const { data: user } = useQuery({
		queryKey: ["currentUser"],
		queryFn: () => fetch("/api/get-user").then((res) => res.json()),
	});
	const { pathname } = useLocation();
	return (
		<div className="container mx-auto flex flex-col h-screen">
			<Header />
			{user && user?.data === "demo" && pathname !== "/" && (
				<p className="text-center">
					All data entered by guests is public and visible to other guests.
				</p>
			)}
			<div className="flex-grow">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default App;
