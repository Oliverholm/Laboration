import { useEffect, useState } from "react";
import "../styles/PostList.css";
import { ThumbsUp, ThumbsDown, MessageSquare } from "react-feather";

export function PostList() {
	// states
	const [posts, setPosts] = useState([]);
	const [reactions, setReactions] = useState(0);

	// variables
	const username = "atuny0";
	const avatarPath = `https://robohash.org/` + username;

	// Click events
	const handleReactionClick = (event) => {
		const target = event.target.classList.value;
		if (!target) {
			return;
		}
		if (target.includes("positive")) {
			setReactions(reactions + 1);
		} else {
			setReactions(reactions - 1);
		}
	};

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
				<div className="post-user-container">
					<span className="post-username">{username}</span>
					<img className="post-avatar" src={avatarPath} />
				</div>
				<div className="post-upper">
					<h3 className="post-title">His mother had always taught him</h3>
				</div>
				<hr className="divider" />
				<div className="post-body">
					His mother had always taught him not to ever think of himself as
					better than others. He'd tried to live by this motto. He never looked
					down on those who were less fortunate or who had less money than him.
					But the stupidity of the group of people he was talking to made him
					change his mind.
				</div>
				<div className="post-lower">
					<div className="post-reactions">
						<PostListButton
							reaction="positive"
							onClick={handleReactionClick}
							icon={<ThumbsUp size={20} className="positive" />}
						/>
						<span className="post-reaction-counter">{reactions}</span>
						<PostListButton
							reaction="negative"
							onClick={handleReactionClick}
							icon={<ThumbsDown size={20} className="negative" />}
						/>
					</div>
					<div className="post-comments">
						<PostListButton
							icon={<MessageSquare size={20} />}
							content="Comments"
							id={3}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}

async function fetchPosts() {
	let result = await fetch("https://dummyjson.com/posts");
	let posts = await result.json;
	return posts;
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
