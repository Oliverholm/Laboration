import { useState } from "react";
import { PostListButton } from "./postlist";
import { ArrowDown, ArrowUp } from "react-feather";

export function Vote({ reactionsImport }) {
	const [reactions, setReactions] = useState(reactionsImport);
	const [vote, setVote] = useState(0);
	const regularColor = "rgba(75, 76, 79, 0.8)";

	// Onclick funktioner
	const upvote = (e) => {
		e.stopPropagation();
		vote === 0 ? setVote(1) : setVote(0);
	};
	const downvote = (e) => {
		e.stopPropagation();
		vote === -1 ? setVote(0) : setVote(-1);

		return (
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
		);
	};
}
