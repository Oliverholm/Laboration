//Jacob
import React, { useState } from "react";
import { categoriesList } from "../utils/constants";
import "../styles/CreatePost.css";
import { CreatePostViewFull } from "../pages/newPost";
import { Link } from "react-router-dom";

export function CreatePostComponent({ users, renderAvatar }) {
	return <CreatePostViewPart users={users} renderAvatar={renderAvatar} />;
}

// [0].username

function CreatePostViewPart({ setAlt, setView, users, renderAvatar }) {
	return (
		<>
			<Link to="/Create">
				<div className="create-post">
					<div className="part-wrapper">
						<input
							type="text"
							placeholder="Create post"
							className="input-test"
							name="part-input"
						></input>
						<button className="img-btn">img</button>
						<button className="link-btn">link</button>
					</div>
				</div>
			</Link>
		</>
	);
}

export function InputComp({ type, name, placeholder, className }) {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			className={className}
		></input>
	);
}

export function CreatePostFullImage({ form, setForm }) {
	return (
		<InputComp
			type="file"
			name="file"
			placeholder="upload photo"
			className="img-input"
		/>
	);
}

export function CreatePostFullLink({ form, setForm }) {
	return (
		<InputComp
			type="url"
			name="link"
			placeholder="Add Link"
			className="link-input"
		/>
	);
}
export function CreatePostFullPost({ form, setForm }) {
	return (
		<textarea
			placeholder="Write a post"
			name="post-area"
			rows="6"
			cols="50"
			className="post-input"
		></textarea>
	);
}

export function DatalistInput({ onChange, tag }) {
	return (
		<>
			<input list="tags" placeholder="Tags" onChange={onChange} />
			<datalist id="tags">
				{categoriesList.map((category, idx) => {
					return <option value={category} key={idx}></option>;
				})}
				;
			</datalist>
		</>
	);
}
