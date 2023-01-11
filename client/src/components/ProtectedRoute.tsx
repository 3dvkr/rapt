import {
	useQuery,
} from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute() {
    const {
		isLoading,
		error,
		data: user,
	} = useQuery({
		queryKey: ["currentUser"],
		queryFn: () => fetch("/api/get-user").then((res) => res.json())
	});

    if (!user) {
        return <Navigate to="/" />
    }
    return <Outlet />
}