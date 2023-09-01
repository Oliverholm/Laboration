import { useEffect, useState } from "react";
import "../styles/PostList.css";
import { ArrowUp, ArrowDown, MessageSquare, Flag, X } from "react-feather";
import { reportList } from "../utils/constants";

// Main Komponent
export function PostList() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [comments, setComments] = useState([]);
	const [postUserId, setpostUserId] = useState();
	const [openModal, setOpenModal] = useState(true);
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
	const fetchComments = () => {
		getComments().then((comments) => {
			setComments(comments);
		});
	};

	useEffect(() => {
		fetchPosts();
		fetchUsers();
		fetchComments();
	}, []);

	return (
		<>
			<ReportModal open={openModal} />
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
								postId={post.id}
								userId={post.userId}
								setpostUserId={setpostUserId}
								username={users[post.userId - 1].username}
								title={post.title}
								body={post.body}
								tags={post.tags}
								reactionsImport={post.reactions}
								commentsImport={comments.total}
							/>
						);
					})
				)}
			</main>
		</>
	);
}
// Komponenter
function ReportModal({ open }) {
	if (!open) return null;
	return (
		<div className="overlay">
			<div className="modalContainer">
				<h3>Submit a report</h3>
				<X size={20} />
				<ReportModalButton />
			</div>
		</div>
	);
}

function ReportModalButton() {
	console.table(reportList);
	return reportList.map((item) => {
		return <button>{item.reportLabel}</button>;
	});
}
function PostListButton({ icon, content, onClick, reaction }) {
	if (!content)
		return (
			<button className={"postlist-button"} onClick={onClick}>
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

function Post({
	postId,
	userId,
	setpostUserId,
	username,
	title,
	body,
	tags,
	reactionsImport,
	commentsImport,
}) {
	const [reactions, setReactions] = useState(reactionsImport);
	const [vote, setVote] = useState(0);
	const avatarPath = `https://robohash.org/` + username + "?set=set4";
	const regularColor = "rgba(75, 76, 79, 0.8)";

	// onClick funktioner
	const upvote = () => {
		vote === 0 ? setVote(1) : setVote(0);
	};
	const downvote = () => {
		vote === -1 ? setVote(0) : setVote(-1);
	};
	// uppercase funktion
	const toUpper = (string) => {
		return string.replace(/\b\w/g, (l) => l.toUpperCase());
	};

	const handleUsernameClick = () => {
		setpostUserId(userId);
		fetch("https://dummyjson.com/posts/user/" + userId)
			.then((res) => res.json())
			.then(console.log);
	};

	return (
		<article className="post">
			<div className="post-top">
				<div className="post-user-container">
					<img className="post-avatar" src={avatarPath} />
					<span className="post-username">
						Posted by:{" "}
						<a onClick={handleUsernameClick} className="post-username-anchor">
							{toUpper(username)}
						</a>
					</span>
				</div>
				<div className="tag-container">
					{tags.map((tag) => (
						<span className="tag" key={tag}>
							{toUpper(tag)}
						</span>
					))}
				</div>
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
						onClick={upvote}
						icon={
							<ArrowUp
								size={20}
								color={vote === 1 ? "green" : regularColor}
								className="positive"
							/>
						}
					/>
					<span className="post-reaction-counter">{reactions + vote}</span>
					<PostListButton
						reaction="negative"
						onClick={downvote}
						icon={
							<ArrowDown
								size={20}
								color={vote === -1 ? "red" : regularColor}
								className="negative"
							/>
						}
					/>
				</div>
				<div className="post-comments">
					<PostListButton
						icon={<MessageSquare size={20} />}
						content={commentsImport}
					/>
				</div>
				<div className="post-report">
					<PostListButton icon={<Flag size={20} />} content="Report" />
				</div>
			</div>
		</article>
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

async function getComments() {
	let result = await fetch("https://dummyjson.com/comments?limit=0");
	let comments = await result.json();
	return comments;
}
