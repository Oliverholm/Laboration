import { CreatePostFullImage } from "../components/createpost";
import { CreatePostFullLink } from "../components/createpost";
import { CreatePostFullPost } from "../components/createpost";
import { InputComp } from "../components/createpost";
import { DatalistInput } from "../components/createpost";
import { useState } from "react";
import "../styles/CreatePost.css";
import { BackButton } from "../components/backButton";

export function NewPost({ users }) {
	return <CreatePostViewFull users={users} />;
}

export function CreatePostViewFull({ form, setForm, handleChange, users }) {
	const [view, setView] = useState("post");
	const [selectedUser, setSelectedUser] = useState(1);
	const [newPostTitle, setNewPostTitle] = useState(null);
	const [tags, setTags] = useState(["", "", ""]);
	let content;
	if (view === "img") {
		content = <CreatePostFullImage />;
	} else if (view === "link") {
		content = <CreatePostFullLink form={form} setForm={setForm} />;
	} else if (view === "post") {
		content = <CreatePostFullPost form={form} setForm={setForm} />;
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
					<form className="input-form-wrapper">
						<label htmlFor="select-user" className="part-label">
							Select User
						</label>
						<select
							onChange={(e) => setSelectedUser(e.target.value)}
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
						<InputComp
							type="text"
							value={newPostTitle}
							onChange={(e) => setNewPostTitle(e.target.value)}
							name="Title"
							placeholder="Title"
							className="input-test-full"
						/>
						{content}
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
									console.log(tags);
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
}
