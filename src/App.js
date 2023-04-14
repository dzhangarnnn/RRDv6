import React from "react";
import { Link, Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";

function HomePage() {
	return (
		<>
			<h1>Main Page</h1>
			<Link to="/users">Users List Page</Link>
		</>
	);
}

function Users() {
	return (
		<Outlet />
		// <>
		// 	{userId ? (
		// 		edit ? (
		// 			edit === "edit" ? (
		// 				<EditUserPage userId={userId} />
		// 			) : (
		// 				<Redirect to={`/users/${userId}`} />
		// 			)
		// 		) : (
		// 			<UserPage userId={userId} />
		// 		)
		// 	) : (
		// 		<UsersListPage userId={userId} />
		// 	)}
		// </>
	);
}

function UsersListPage() {
	const pagesIds = [0, 1, 2, 3, 4, 5];
	return (
		<>
			<Link to="/">Main Page</Link>
			<ul>
				{pagesIds.map((id) => (
					<li key={id}>
						<Link to={`/users/${id}/profile`}>User Page {id}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
function EditUserPage() {
	const { userId } = useParams();
	console.log(userId);
	return (
		<>
			<div>
				<Link to={`/users/${userId}/profile`}>User Page {userId}</Link>
			</div>
			<div>
				<Link to={`/users/${Number(userId) + 1}/profile`}>Another User</Link>
			</div>
			<div>
				<Link to="/users">Users List Page</Link>
			</div>
		</>
	);
}

function UserPage() {
	const { userId } = useParams();
	return (
		<>
			<div>
				<Link to={`/users/${userId}/edit`}> Edit User Page</Link>
			</div>
			<div>
				<Link to="/users">Users List Page</Link>
			</div>

			<p>User id: {userId}</p>
		</>
	);
}

function App() {
	return (
		<div>
			<Routes>
				<Route path="" element={<HomePage />} />
				<Route path="users" element={<Users />}>
					<Route index element={<UsersListPage />} />
					<Route path=":userId">
						<Route index element={<Navigate to="profile" />} />
						<Route path="profile" element={<UserPage />} />
						<Route path="edit" element={<EditUserPage />} />
						<Route path="*" element={<Navigate to="profile" />} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
