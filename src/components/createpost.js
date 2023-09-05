// Jacob's componenets
import React, { useState } from "react";
import { Meh } from "react-feather";
import { useState } from "react";
import {
  ROUTE_HOME,
  ROUTE_POST,
  INPUT_PAGE_TEXT,
  INPUT_PAGE_IMG,
  INPUT_PAGE_LINK,
} from "../utils/constants";
import "../styles/CreatePost.css";
import "../styles/CreatePost.css";
import { useState } from "react";

/*
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
  const [route, setRoute] = useState({ route: ROUTE_HOME });
  const [inputType, setInputType] = useState((inputType = INPUT_PAGE_TEXT));
     const updateInput = (event) => {
    setContent(event.target.value);
  };
  if (route.route === ROUTE_HOME) {
    return (
      <>
      <div className="create-post-wrapper">
      <UserListCreatePost />
      <InputCreatePost placeholder="create post" />
      <ButtonCreatePost icon="Meh" />
      <ButtonCreatePost />
      <Meh />
      </div>
      </>
      );
    } else if (route.route === ROUTE_POST) {
      return (
        <>
        <div className="create-post-fullpage-wrapper">
        <InputCreatePost placeholder="create post" />
        <ButtonCreatePost />
        <ButtonCreatePost />
        <ButtonCreatePost />
        </div>
        </>
        );
      } else return;
    }
    
    */

// TEST

export function CreatePostComponent() {
  <div>
    <p>hej</p>
  </div>;
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
