import "./App.css";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { NavBar } from "./components/navbar";
import { Home } from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SinglePost } from "./pages/singlePost";
import { NewPost } from "./pages/newPost";

function App() {
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const [singlePost, setSinglePost] = useState([]);

	const fetchUsers = () => {
		getUsers().then((users) => {
			setUsers(users.users);
		});
	};
	const fetchPosts = () => {
		getPosts().then((posts) => {
			setPosts(posts.posts);
		});
	};

	function renderAvatar(username) {
		const avatarPath = `https://robohash.org/` + username + "?set=set4";
		return avatarPath;
	}

	useEffect(() => {
		fetchUsers();
		fetchPosts();
	}, []);

	return (
		<Router>
			<div className="App">
				<NavBar posts={posts} setFilteredResults={setFilteredResults} />
				<Sidebar posts={posts} setFilteredResults={setFilteredResults} />
				<main className="main-content">
					<Routes>
						<Route
							exact
							path="/"
							element={
								<Home
									posts={posts}
									users={users}
									renderAvatar={renderAvatar}
									filteredResults={filteredResults}
									setSinglePost={setSinglePost}
								/>
							}
						/>
						<Route
							path="/Post"
							element={
								<SinglePost
									post={singlePost}
									users={users}
									setSinglePost={setSinglePost}
									reactionsImport={singlePost.reactions}
								/>
							}
						/>
						<Route path="/Create" element={<NewPost users={users} />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

/*
							element={
								<SinglePost
									post={singlePost}
									username={users[singlePost.userId - 1].username}
									reactionsImport={singlePost.reactions}
								/>
							}
*/

async function getPosts() {
	let result = await fetch("https://dummyjson.com/posts?limit=20");
	let posts = await result.json();
	return posts;
}

async function getUsers() {
	let result = await fetch("https://dummyjson.com/users?limit=0");
	let users = await result.json();
	return users;
}

export default App;
