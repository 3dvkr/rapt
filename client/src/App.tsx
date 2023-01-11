import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
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
