import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function App() {
	const path = useLocation();
	const [user, setUser] = useState(true);

	if (!user && path.pathname !== "/") {
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
