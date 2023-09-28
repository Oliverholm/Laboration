import { useEffect, useState } from "react";
import "../styles/PostList.css";
import { ArrowUp, ArrowDown, MessageSquare, Flag, X } from "react-feather";
import { reportList } from "../utils/constants";
import { Link } from "react-router-dom";

// Main Komponent
export function PostList({ users, posts, filteredResults, setSinglePost }) {
	const [comments, setComments] = useState([]);
	const [postUserId, setpostUserId] = useState();
	const [openModal, setOpenModal] = useState(false);
	const [displayedPosts, setDisplayedPosts] = useState([]);

	useEffect(() => {
		const postsToDisplay = filteredResults.length > 0 ? filteredResults : posts;
		setDisplayedPosts(postsToDisplay);
	}, [filteredResults, posts]);

	return (
		<>
			<ReportModal open={openModal} setOpen={setOpenModal} />
			<section className="postlist">
				{!posts || !users ? (
					<div className="post-placeholder">
						<h3>Posts haven't loaded yet...</h3>
					</div>
				) : (
					displayedPosts.map((post, i) => {
						return (
							<Post
								key={i}
								post={post}
								setpostUserId={setpostUserId}
								username={users[post.userId - 1].username}
								reactionsImport={post.reactions}
								comments={comments}
								setSinglePost={setSinglePost}
							/>
						);
					})
				)}
			</section>
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
						setOpen(true);
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
export function PostListButton({ icon, content, onClick }) {
	if (!content)
		return (
			<button className="postlist-button" onClick={onClick}>
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

function Post({ post, username, reactionsImport, setSinglePost }) {
	const avatarPath = `https://robohash.org/` + username + "?set=set4";
	const regularColor = "rgba(75, 76, 79, 0.8)";

	const { title, body, tags } = post;

	// uppercase funktion
	const toUpper = (string) => {
		return string.replace(/\b\w/g, (l) => l.toUpperCase());
	};

	return (
		<Link to="/Post" onClick={() => setSinglePost(post)}>
			<article className="post">
				<div className="post-top">
					<div className="post-user-container">
						<img className="post-avatar" src={avatarPath} />
						<span className="post-username">
							Posted by:{" "}
							<span className="post-username-anchor">{toUpper(username)}</span>
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
				<div className="post-body">
					{body.length > 60 ? body.slice(0, 60) + "..." : body}
				</div>
				<div className="post-lower"></div>
			</article>
		</Link>
	);
}
