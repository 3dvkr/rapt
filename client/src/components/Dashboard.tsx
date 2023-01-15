import { Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

export function Dashboard() {
	const { isLoading, data: timers } = useQuery({
		queryKey: ["timers"],
		queryFn: () => fetch("/api/timers").then((res) => res.json()),
	});
	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra w-full">
				<thead>
					<tr>
						<th>Category</th>
						<th>Duration</th>
						<th>Memo</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading && (
						<>
							{timers.map(
								(t: { category: string; duration: string; memo: string }) => {
									return (
										<tr>
											<td>{t.category}</td>
											<td>{t.duration}</td>
											<td>{t.memo}</td>
										</tr>
									);
								}
							)}
						</>
					)}
				</tbody>
			</table>
		</div>
	);
}
