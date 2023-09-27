import { CreatePostFullImage } from "../components/createpost";
import { CreatePostFullLink } from "../components/createpost";
import { CreatePostFullPost } from "../components/createpost";
import { InputComp } from "../components/createpost";
import { DatalistInput } from "../components/createpost";
import { useState } from "react";
import "../styles/CreatePost.css";
import { BackButton } from "../components/backButton";
import { useNavigate } from "react-router-dom";

export function NewPost({ users, posts, setPosts }) {
	return <CreatePostViewFull users={users} posts={posts} setPosts={setPosts} />;
}

export function CreatePostViewFull({ users, posts, setPosts }) {
	const [view, setView] = useState("post");
	const [selectedUser, setSelectedUser] = useState(1);
	const [newPostTitle, setNewPostTitle] = useState("");
	const [tags, setTags] = useState(["", "", ""]);
	const [bodyContent, setBodyContent] = useState("");
	const navigate = useNavigate();
	let contentVariant;
	if (view === "img") {
		contentVariant = (
			<CreatePostFullImage
				bodyContent={bodyContent}
				setBodyContent={setBodyContent}
			/>
		);
	} else if (view === "link") {
		contentVariant = (
			<CreatePostFullLink
				bodyContent={bodyContent}
				setBodyContent={setBodyContent}
			/>
		);
	} else if (view === "post") {
		contentVariant = (
			<CreatePostFullPost
				bodyContent={bodyContent}
				setBodyContent={setBodyContent}
			/>
		);
	}

	return (
		<div className="create-post-view-wrapper">
			<BackButton />
			<div>
				<p className="post-header">Create a post!</p>
			</div>
			<div className="input-wrapper">
				<nav className="pre-input-nav">
					<button onClick={() => setView("post")}>Post</button>
					<button onClick={() => setView("img")}>Img</button>
					<button onClick={() => setView("link")}>link</button>
				</nav>
				<span>
					<form className="input-form-wrapper" onSubmit={handleSubmit}>
						<label htmlFor="select-user" className="part-label">
							Select User
						</label>
						<select
							onChange={(e) => setSelectedUser(parseInt(e.target.value))}
							name="Users"
							id="select-user"
							className="create-post-selector"
						>
							{users.map((user, idx) => {
								return (
									<option key={idx} value={user.id}>
										{user.username}
									</option>
								);
							})}
						</select>
						<input
							type="text"
							value={newPostTitle}
							onChange={(e) => setNewPostTitle(e.target.value)}
							name="Title"
							placeholder="Title"
							className="input-test-full"
						/>
						<div>{contentVariant}</div>

						<div className="datalist-div">
							<DatalistInput
								onChange={(e) => (tags[0] = e.target.value)}
								tag={tags[0]}
							/>
							<DatalistInput
								onChange={(e) => (tags[1] = e.target.value)}
								tag={tags[1]}
							/>
							<DatalistInput
								onChange={(e) => {
									tags[2] = e.target.value;
								}}
								tag={tags[2]}
							/>
						</div>
						<button type="submit" className="input-test-full">
							submit
						</button>
					</form>
				</span>
			</div>
		</div>
	);

	// setState, filer för att få bort tomma index i array.

	function handleSubmit(e) {
		e.preventDefault();
		const filtedredTags = tags.filter((elem) => elem != "");

		fetch("https://dummyjson.com/posts/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: newPostTitle,
				userId: selectedUser,
				body: bodyContent,
				tags: filtedredTags,
				reactions: 0,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPosts([data, ...posts]);
				navigate("/");
			});
	}
}
// skapa ny post med fetchdata -> main -> ny post
// navigate("/")
// implementera rendera sök-tjosan
