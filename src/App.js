import "./App.css";
import { useEffect, useState } from "react";
import { CreatePostComponent } from "./components/createpost";
import { PostList } from "./components/postlist";
import { Sidebar } from "./components/sidebar";
import { NavBar } from "./components/navbar";

function App() {
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);

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
		<div className="App">
			<NavBar posts={posts} />
			<Sidebar posts={posts} />
			<main className="main-content">
				<CreatePostComponent users={users} renderAvatar={renderAvatar} />
				<PostList users={users} posts={posts} />
			</main>
		</div>
	);
}

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
