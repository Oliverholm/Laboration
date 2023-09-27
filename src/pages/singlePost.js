import { useEffect, useState } from "react";
import "../styles/SinglePost.css";
import { BackButton } from "../components/backButton";
import { PostListButton } from "../components/postlist";
import { ArrowUp, ArrowDown, MessageSquare, Flag, X } from "react-feather";

export function SinglePost({ post, users, reactionsImport, setSinglePost }) {
	const [commentsOnPost, setCommentsOnPost] = useState([]);
	const [vote, setVote] = useState(0);
	const [reactions, setReactions] = useState(reactionsImport);

	const { id, userId, title, body, tags } = post;
	const username = users[post.userId - 1].username;
	const avatarPath = `https://robohash.org/` + username + "?set=set4";

	const commentAvatarPath = (username) => {
		const avatarPath = `https://robohash.org/` + username + "?set=set4";
		return avatarPath;
	};
	const regularColor = "rgba(75, 76, 79, 0.8)";

	const fetchComments = () => {
		getCommentsOfPost().then((comments) => {
			setCommentsOnPost(comments.comments);
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

	async function getCommentsOfPost(postId) {
		let result = await fetch("https://dummyjson.com/comments/post/" + id);
		let comments = await result.json();
		return comments;
	}

	useEffect(() => {
		fetchComments();
	}, []);
	console.log(commentsOnPost);
	return (
		<section className="post-section">
			<BackButton setSinglePost={setSinglePost} />
			{post.length === 0 || users.length === 0 ? (
				<div className="post-placeholder">
					<BackButton setSinglePost={setSinglePost} />
					<h3>Posts haven't loaded yet...</h3>
				</div>
			) : (
				<div>
					<article className="post">
						<div className="post-top">
							<div className="post-user-container">
								<img className="post-avatar" src={avatarPath} />
								<span className="post-username">
									Posted by: <span>{toUpper(username)}</span>
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
						<p>{body}</p>
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
								<span className="post-reaction-counter">
									{reactions + vote}
								</span>
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
							<div className="post-report">
								<PostListButton icon={<Flag size={20} />} content="Report" />
							</div>
						</div>
					</article>
					<div className="Comments">
						{commentsOnPost.length === 0 ? (
							<div className="comment">
								<h2>Inga Kommentarer</h2>
							</div>
						) : (
							<div>
								<p className="comment-count">
									<MessageSquare />
									<span>{commentsOnPost.length}</span>
								</p>
								{commentsOnPost.map((comment, idx) => {
									return (
										<div key={idx} className="comment">
											<div className="post-user-container">
												<img
													className="post-avatar"
													src={commentAvatarPath(comment.user.username)}
												/>
												<span className="post-username">
													Posted by:{" "}
													<span>{toUpper(comment.user.username)}</span>
												</span>
											</div>
											<p>{comment.body}</p>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	);
}
