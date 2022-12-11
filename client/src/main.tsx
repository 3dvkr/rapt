import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Timer } from "./components/Timer";
import { Dashboard } from "./components/Dashboard";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		//   errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <h1>landing page</h1> },
			{
				path: "/timer",
				element: <Timer />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
