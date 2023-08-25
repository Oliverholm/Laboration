import { useEffect, useState } from "react";
import "../styles/PostList.css";

export function PostList() {
	const [posts, setPosts] = useState([]);

	const getPosts = () => {
		fetchPosts().then((posts) => {
			setPosts(posts.posts);
		});
	};
	useEffect(() => {
		getPosts();
	});

	return (
		<main className="postlist">
			<div className="post">
				<div>Hello</div>
			</div>
		</main>
	);
}

async function fetchPosts() {
	let result = await fetch("https://dummyjson.com/posts");
	let posts = await result.json;
	return posts;
}

function Post() {
	return;
}
