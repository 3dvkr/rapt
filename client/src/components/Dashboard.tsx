import { useQuery } from "@tanstack/react-query";

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
							{Array.isArray(timers) && timers.map(
								(t: { category: string; duration: number; memo: string, id:number }) => {
									return (
										<tr key={t.id}>
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
