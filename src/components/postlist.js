import { useEffect, useState } from "react";
import "../styles/PostList.css";
import { ThumbsUp, ThumbsDown, MessageSquare } from "react-feather";

// Main Komponent
export function PostList() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const fetchPosts = () => {
		getPosts().then((posts) => {
			setPosts(posts.posts);
		});
	};
	const fetchUsers = () => {
		getUsers().then((users) => {
			setUsers(users.users);
		});
	};

	useEffect(() => {
		fetchPosts();
		fetchUsers();
	}, []);

	return (
		<main className="postlist">
			{posts.length === 0 || users.length === 0 ? (
				<div className="post-placeholder">
					<h3>Posts haven't loaded yet...</h3>
				</div>
			) : (
				posts.map((post, i) => {
					return (
						<Post
							key={i}
							username={users[post.userId - 1].username}
							title={post.title}
							body={post.body}
							tags={post.tags}
							reactionsImport={post.reactions}
						/>
					);
				})
			)}
		</main>
	);
}

// Komponenter
function PostListButton({ icon, content, onClick, reaction }) {
	if (!content)
		return (
			<button className={"postlist-button " + reaction} onClick={onClick}>
				{icon}
			</button>
		);
	else
		return (
			<button className="postlist-button">
				{icon} <span className="postlist-button-content">{content}</span>
			</button>
		);
}

function Post({ username, title, body, tags, reactionsImport }) {
	const [reactions, setReactions] = useState(reactionsImport);
	const [vote, setVote] = useState(0);
	const avatarPath = `https://robohash.org/` + username;

	// onClick funktioner
	const increment = () => {
		vote === 0 ? setVote(1) : setVote(0);
	};

	const decrement = () => {
		vote === 1 ? setVote(0) : setVote(-1);
	};

	return (
		<div className="post">
			<div className="post-user-container">
				<span className="post-username">{username}</span>
				<img className="post-avatar" src={avatarPath} />
			</div>
			<div className="post-upper">
				<h3 className="post-title">{title}</h3>
				<div className="tag-container">
					{tags.map((tag) => (
						<span className="tag" key={tag}>
							{tag}
						</span>
					))}
				</div>
			</div>
			<hr className="divider" />
			<div className="post-body">{body}</div>
			<div className="post-lower">
				<div className="post-reactions">
					<PostListButton
						reaction="positive"
						onClick={increment}
						icon={
							<ThumbsUp
								size={20}
								color={vote === 1 ? "green" : "rgba(75, 76, 79, 0.8)"}
								className="positive"
							/>
						}
					/>
					<span className="post-reaction-counter">{reactions + vote}</span>
					<PostListButton
						reaction="negative"
						onClick={decrement}
						icon={
							<ThumbsDown
								size={20}
								color={vote === -1 ? "red" : "rgba(75, 76, 79, 0.8)"}
								className="negative"
							/>
						}
					/>
				</div>
				<div className="post-comments">
					<PostListButton
						icon={<MessageSquare size={20} />}
						content="Comments"
					/>
				</div>
			</div>
		</div>
	);
}

// fetch
async function getPosts() {
	let result = await fetch("https://dummyjson.com/posts");
	let posts = await result.json();
	return posts;
}

async function getUsers() {
	let result = await fetch("https://dummyjson.com/users?limit=0");
	let users = await result.json();
	return users;
}
