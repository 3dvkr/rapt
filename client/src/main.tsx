import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LandingPage } from "./components/LandingPage";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Timer } from "./components/Timer";
import { Dashboard } from "./components/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
export const loginPath = "app";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		//   errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{ path: "/sign-up", element: <SignUp /> },
			{ path: "/login", element: <Login /> },
			{
				path: loginPath,
				element: <ProtectedRoute />,
				children: [
					{
						path: "timer",
						element: <Timer />,
					},
					{
						path: "dashboard",
						element: <Dashboard />,
					},
				],
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
