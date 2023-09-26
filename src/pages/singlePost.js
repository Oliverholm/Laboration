import { useState } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Flag, X } from "react-feather";
import { reportList } from "../utils/constants";
import { PostListButton } from "../components/postlist";

export function SinglePost({ post, username, reactionsImport }) {
	const [commentsOnPost, setCommentsOnPost] = useState(0);
	const [vote, setVote] = useState(0);
	const avatarPath = `https://robohash.org/` + username + "?set=set4";
	const regularColor = "rgba(75, 76, 79, 0.8)";

	const { id, userId, title, body, tags } = post;

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

	return (
		<article className="post">
			<div className="post-top">
				<div className="post-user-container">
					<img className="post-avatar" src={avatarPath} />
					<span className="post-username">Posted by: {toUpper(username)}</span>
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
