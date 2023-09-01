// Jacob's componenets
import React, { useState } from "react";
import { Meh } from "react-feather";
import "../styles/CreatePost.css";
import { useState } from "react";

function UserListCreatePost() {
  return (
    <div>
      <label for="select User">Select User </label>
      <select name="Users" id="Users">
        <option value="Jonte">Jonte</option>
        <option value="Johanna">Johanna</option>
        <option value="Johan">Johan</option>
        <option value="Jolle">Jolle</option>
        <option value="DragonSlayer">DragonSlayer</option>
        <option value="Julia">Julia</option>
      </select>
    </div>
  );
}

function InputCreatePost({ place, id }) {
  return <input placeholder={place} id={id}></input>;
}
function ButtonCreatePost({ BtnText, id }) {
  return <button id={id}>{BtnText}</button>;
}

export function CreatePostComponent() {
  return (
    <>
      <section className="create-post-wrapper">
        <Meh className="icon-meh" />
        <UserListCreatePost />
        <InputCreatePost place="Create Post" id="create-post-id-input" />
        <ButtonCreatePost BtnText="Img-Post" id="create-post-id-btn-img" />
        <ButtonCreatePost BtnText="Link-Post" id="create-post-id-btn-link" />
      </section>
    </>
  );
}

export function FullpageCreatePostComponent() {
  const [postView, setPostView] = useState("post");
  let content;
  if (content === "post") {
    return <div>Post</div>;
  } else if (content === "img") {
    return <div>img</div>;
  } else {
    return;
    <div>Link</div>;
  }

  return (
    <div className="create-post-wrapper">
      <section className="create-post-f-section-header">
        <h2>Create a Post</h2>
      </section>
      <section>
        <FullpagePost title="Post" placeholder="" />
        <FullpagePost title="Image" placeholder="" />
        <FullpagePost title="Link" placeholder="" />
      </section>
    </div>
  );
}

function FullpagePost({ title, placeholder }) {
  return (
    <div>
      <h4>{title}</h4>
      <textarea placeholder={placeholder}></textarea>
      <p>add tags:</p>
    </div>
  );
}
