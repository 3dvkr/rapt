import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Timer } from "./components/Timer";
import { Dashboard } from "./components/Dashboard";
import "./index.css";
import {
	QueryClient,
	QueryClientProvider
} from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();
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
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
