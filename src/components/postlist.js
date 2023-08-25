import { useEffect, useState } from "react";
import "../styles/PostList.css";
import { ThumbsUp, ThumbsDown, MessageSquare } from "react-feather";

async function getPosts() {
	let result = await fetch("https://dummyjson.com/posts");
	let posts = await result.json();
	return posts;
}

export function PostList() {
	// states
	const [posts, setPosts] = useState([]);

	// variables
	const fetchPosts = () => {
		setPosts(posts.posts);
	};
	useEffect(() => {
		fetchPosts();
	}, []);
	return (
		<main className="postlist">
			{posts.length === 0 ? (
				<div className="post-placeholder">
					<p>Posts haven't loaded yet...</p>
				</div>
			) : (
				posts.map((post) => {
					return (
						<Post
							username={post.userId}
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
	const [reactionIndicator, setreactionIndicator] = useState([false, false]);
	const avatarPath = `https://robohash.org/` + username;

	// Click events
	// behöver en reset då den får minusvärde vid klick av negativ till positiv
	const increment = (event) => {
		const target = event.target.classList.value;
		if (target.includes("positive")) {
			if (!reactionIndicator[0]) {
				setReactions(reactions + 1);
				setreactionIndicator([true, false]);
			} else {
				setReactions(reactions - 1);
				setreactionIndicator([false, false]);
			}
		} else {
			return;
		}
	};

	const decrement = (event) => {
		const target = event.target.classList.value;
		if (target.includes("negative")) {
			if (!reactionIndicator[1]) {
				setReactions(reactions - 1);
				setreactionIndicator([false, true]);
			} else {
				setReactions(reactions + 1);
				setreactionIndicator([false, false]);
			}
		} else {
			return;
		}
	};

	return (
		<div className="post">
			<div className="post-user-container">
				<span className="post-username">{username}</span>
				<img className="post-avatar" src={avatarPath} />
			</div>
			<div className="post-upper">
				<h3 className="post-title">{title}</h3>
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
								color={reactionIndicator[0] ? "green" : "rgba(75, 76, 79, 0.8)"}
								className="positive"
							/>
						}
					/>
					<span className="post-reaction-counter">{reactions}</span>
					<PostListButton
						reaction="negative"
						onClick={decrement}
						icon={
							<ThumbsDown
								size={20}
								color={reactionIndicator[1] ? "red" : "rgba(75, 76, 79, 0.8)"}
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
