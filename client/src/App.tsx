import { useState } from "react";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Timer } from "./components/Timer";

function App() {
	return (
		<div className="container mx-auto flex flex-col h-screen">
			<Header />
			<div className="flex-grow">
				<Timer />
			</div>
			<Footer />
		</div>
	);
}

export default App;
