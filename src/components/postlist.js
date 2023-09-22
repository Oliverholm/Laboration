import { useEffect, useState } from "react";
import "../styles/PostList.css";
import { ArrowUp, ArrowDown, MessageSquare, Flag, X } from "react-feather";
import { reportList } from "../utils/constants";

// Main Komponent
export function PostList() {
	useEffect(() => {
		fetchPosts();
		fetchUsers();
		fetchComments();
	}, []);

	return (
		<>
			<ReportModal open={openModal} setOpen={setOpenModal} />
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
								post={post}
								setpostUserId={setpostUserId}
								username={users[post.userId - 1].username}
								reactionsImport={post.reactions}
								comments={comments}
							/>
						);
					})
				)}
			</main>
		</>
	);
}
// Komponenter
function ReportModal({ open, setOpen }) {
	const [selectedReport, setSelectedReport] = useState();
	const aboutReport = selectedReport ? (
		<div className="about-report">
			<div>
				<h3>{selectedReport.reportLabel}</h3>
				<p className="about-report-p">{selectedReport.reportDescription}</p>
			</div>
			<div>
				<button
					className="modal-report-button"
					onClick={() => {
						setOpen(false);
					}}
				>
					Report
				</button>
			</div>
		</div>
	) : (
		<div className="about-report">
			<div>
				<h3>Select Reason.</h3>
			</div>
			<div>
				<button className="modal-disabled-report-button">Report</button>
			</div>
		</div>
	);
	if (!open) return null;
	return (
		<div className="overlay">
			<div className="modal-container">
				<div className="report-modal-top">
					<h3>Submit a report</h3>
					<X
						className="close"
						size={20}
						onClick={() => {
							setOpen(false);
						}}
					/>
				</div>
				<ReportModalButton
					set={setSelectedReport}
					selectedReport={selectedReport}
				/>
				<div>{aboutReport}</div>
			</div>
		</div>
	);
}

function ReportModalButton({ set, selectedReport }) {
	function classChanger(item) {
		if (item === selectedReport) {
			return "report-label-button selected";
		} else {
			return "report-label-button";
		}
	}
	return (
		<div className="report-modal-button-wrapper">
			{reportList.map((item, i) => {
				return (
					<button
						key={i}
						className={classChanger(item)}
						onClick={() => {
							set(item);
						}}
					>
						{item.reportLabel}
					</button>
				);
			})}
		</div>
	);
}
function PostListButton({ icon, content, onClick }) {
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

function Post({ post, setpostUserId, username, reactionsImport, comments }) {
	const [reactions, setReactions] = useState(reactionsImport);
	const [vote, setVote] = useState(0);
	const [commentsOnPost, setCommentsOnPost] = useState(0);
	const avatarPath = `https://robohash.org/` + username + "?set=set4";
	const regularColor = "rgba(75, 76, 79, 0.8)";

	const { id, userId, title, body, tags } = post;

	const fetchCommentsOnPost = (id) => {
		fetch("https://dummyjson.com/comments/post/" + id)
			.then((res) => res.json())
			.then((comment) => {
				setCommentsOnPost(comment.total);
			});
	};

	// onClick funktioner
	const upvote = (e) => {
		e.stopPropagation();
		vote === 0 ? setVote(1) : setVote(0);
	};
	const downvote = (e) => {
		e.stopPropagation();
		vote === -1 ? setVote(0) : setVote(-1);
	};
	// uppercase funktion
	const toUpper = (string) => {
		return string.replace(/\b\w/g, (l) => l.toUpperCase());
	};

	const handleUsernameClick = (e) => {
		e.stopPropagation();
		setpostUserId(userId);
		fetch("https://dummyjson.com/posts/user/" + userId).then((res) =>
			res.json()
		);
	};

	useEffect(() => {
		fetchCommentsOnPost(id);
	}, []);

	return (
		<article
			className="post"
			onClick={() => {
				console.log(post);
			}}
		>
			<div className="post-top">
				<div className="post-user-container">
					<img className="post-avatar" src={avatarPath} />
					<span className="post-username">
						Posted by:{" "}
						<a
							onClick={(e) => handleUsernameClick(e)}
							className="post-username-anchor"
						>
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
						onClick={(e) => {
							upvote(e);
						}}
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
						onClick={(e) => {
							downvote(e);
						}}
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
						content={commentsOnPost}
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
	let result = await fetch("https://dummyjson.com/posts?limit=20");
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

async function getCommentsOfPost(postId) {
	let result = await fetch("https://dummyjson.com/comments/post/" + postId);
	let comments = await result.json();
	return comments;
}
