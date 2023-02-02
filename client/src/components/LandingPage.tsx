import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient, loginPath } from "../main";

export function LandingPage() {
	const [errors, setErrors] = useState("");
	const navigate = useNavigate();
	const { mutate, isLoading } = useMutation({
		mutationFn: async function () {
			const res = await fetch("/api/login", {
				body: JSON.stringify({ username: "demo", password: "demo" }),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(json.message);
			}
			return json;
		},

		onSettled: (data, e) => {
			const error = e as { message: string };
			queryClient.invalidateQueries({ queryKey: ["currentUser"] }).then(() => {
				if (!error) {
					navigate("/" + loginPath + "/timer");
				} else {
					setErrors("something went wrong");
				}
			});
		},
		retry: 2,
	});
	const handleGuestClick = () => {
		mutate();
	};
	return (
		<div
			className="py-2 h-full grid"
			style={{
				background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
			}}
		>
			<div className="container mx-auto px-6 grid ">
				<div className="self-center">
					<p className="text-4xl lg:text-8xl text-center font-bold mb-2 text-white">
						Track time.
					</p>
					<p className="text-4xl lg:text-8xl text-center font-bold mb-2 text-white animate-motion delay-150 opacity-0">
						Build habits.
					</p>
					<p className="text-4xl lg:text-8xl text-center font-bold mb-2 text-white animate-motion-far delay-300 opacity-0">
						Make progress.
					</p>
				</div>
				<div className="flex flex-col">
					<Link
						to="/sign-up"
						className="bg-white font-bold rounded-full mt-4 py-4 px-10 lg:py-6 lg:px-16 lg:text-3xl h-min shadow-lg uppercase tracking-wider mx-auto hover:scale-105 transition-transform ease-out"
					>
						Sign up
					</Link>
					<button
						onClick={handleGuestClick}
						className="bg-white font-bold rounded-full mt-4 py-2 px-4 lg:py-4 lg:px-8 lg:text-xl h-min shadow-lg uppercase tracking-wider mx-auto hover:scale-103 transition-transform ease-out"
					>
						Use as Guest {isLoading && "..."}
					</button>
					{errors && <p className="text-white text-center">Error: {errors}; please try again.</p>}
				</div>
			</div>
		</div>
	);
}
