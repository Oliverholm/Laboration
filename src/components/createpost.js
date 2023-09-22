//Jacob
import React, { useState } from "react";

import "../styles/CreatePost.css";

export function CreatePostComponent({ users, renderAvatar }) {
	const [alt, setAlt] = useState("part");
	const [view, setView] = useState("post");

	if (alt === "part") {
		return (
			<CreatePostViewPart
				alt={alt}
				setAlt={setAlt}
				setView={setView}
				users={users}
			/>
		);
	} else if (alt === "full") {
		return <CreatePostViewFull view={view} setView={setView} />;
	} else if (alt === "img") {
		return <CreatePostViewFull view={view} setView={setView} />;
	} else if (alt === "link") {
		return <CreatePostViewFull view={view} setView={setView} />;
	}
}

// [0].username

function CreatePostViewPart({ setAlt, setView, users }) {
	const [selectedUser, setSelectedUser] = useState(null);
	return (
		<>
			<div className="create-post">
				<div className="part-wrapper">
					<label htmlFor="select-user" className="part-label">
						Select User
					</label>
					<select name="Users" id="select-user">
						{users.map((user, idx) => {
							return (
								<option key={idx} value={user.username}>
									{user.username}
								</option>
							);
						})}
					</select>
					<div>
						<input
							type="text"
							placeholder="Create post"
							className="input-test"
							name="part-input"
							onClick={() => {
								setView("post");
								setAlt("full");
							}}
						></input>
						<button
							onClick={() => {
								setView("img");
								setAlt("img");
							}}
						>
							img
						</button>
						<button
							onClick={() => {
								setView("link");
								setAlt("link");
							}}
						>
							link
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

function CreatePostViewFull({ view, setView, form, setForm, handleChange }) {
	let content;
	if (view === "img") {
		content = <CreatePostFullImage />;
	} else if (view === "link") {
		content = <CreatePostFullLink form={form} setForm={setForm} />;
	} else if (view === "post") {
		content = <CreatePostFullPost form={form} setForm={setForm} />;
	}

	return (
		<div>
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
						<InputComp
							type="text"
							onChange={handleChange}
							name="Title"
							placeholder="Title"
							className="input-test"
						/>
						{content}
						<InputComp
							type="text"
							onChange={handleChange}
							name="Tags"
							placeholder="Add tags"
							className="input-test"
						/>
						<InputComp
							type="submit"
							onChange={handleChange}
							name="Submit"
							placeholder="Post"
							className="input-test"
						/>
					</form>
				</span>
			</div>
		</div>
	);
}

function InputComp({ type, onChange, name, placeholder, className }) {
	return (
		<input
			type={type}
			onChange={onChange}
			name={name}
			placeholder={placeholder}
			className={className}
		></input>
	);
}

function CreatePostFullImage({ form, setForm }) {
	return (
		<InputComp
			type="file"
			onChange={(e) => {
				handleChange(e, form, setForm);
			}}
			name="file"
			placeholder="upload photo"
			className="img-input"
		/>
	);
}

function CreatePostFullLink({ form, setForm }) {
	return (
		<InputComp
			type="url"
			onChange={(e) => {
				handleChange(e, form, setForm);
			}}
			name="link"
			placeholder="Add Link"
			className="link-input"
		/>
	);
}
function CreatePostFullPost({ form, setForm }) {
	return (
		<textarea
			placeholder="Write a post"
			name="post-area"
			rows="6"
			cols="50"
			onChange={(e) => {
				handleChange(e, form, setForm);
			}}
			className="post-input"
		></textarea>
	);
}
function handleChange(e, form, setForm) {
	setForm({
		...form,
		[e.target.name]: e.target.value,
	});
}
