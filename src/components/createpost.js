// Jacob's componenets
import React from "react";
import { Meh } from "react-feather";

function UserListCreatePost() {}
function InputCreatePost({ placeholder }) {
  <input placeholder={placeholder}></input>;
}
function ButtonCreatePost(icon) {
  return (
    <>
      <button>
        <span>
          <i></i>
        </span>
      </button>
    </>
  );
}
function FullpageCreatePost() {}

export function CreatePostComponent() {
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
}
