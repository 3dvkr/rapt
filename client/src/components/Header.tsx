export function Header() {
	return (
		<header>
			<nav className="navbar bg-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">daisyUI</a>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						<li>
							<a>Dashboard</a>
						</li>
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
