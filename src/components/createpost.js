//Jacob
import React, { useState } from "react";
import { Meh } from "react-feather";

import "../styles/CreatePost.css";

export function CreatePostComponent() {
  const [alt, setAlt] = useState("part");
  const [view, setView] = useState("post");

  if (alt === "part") {
    return <CreatePostViewPart alt={alt} setAlt={setAlt} setView={setView} />;
  } else if (alt === "full") {
    return <CreatePostViewFull view={view} setView={setView} />;
  } else if (alt === "img") {
    return <CreatePostViewFull view={view} setView={setView} />;
  } else if (alt === "link") {
    return <CreatePostViewFull view={view} setView={setView} />;
  }
}

function CreatePostViewPart({ alt, setAlt, view, setView }) {
  return (
    <>
      <div className="part-wrapper">
        <label for="select User" className="part-label">
          Select User{" "}
        </label>
        <select name="Users" id="Users">
          <option value="Jonte">Jonte</option>
          <option value="Johanna">Johanna</option>
          <option value="Johan">Johan</option>
          <option value="Jolle">Jolle</option>
          <option value="DragonSlayer">DragonSlayer</option>
          <option value="Julia">Julia</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Create post"
          className="input-test"
          name="part-input"
          onClick={() => setAlt("full")}
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
    </>
  );
}

function CreatePostViewFull({ view, setView }) {
  let content;
  if (view === "img") {
    content = <CreatePostFullImage />;
  } else if (view === "link") {
    content = <CreatePostFullLink />;
  } else if (view === "post") {
    content = <CreatePostFullPost />;
  }

  return (
    <div>
      <div>
        <p className="post-header">Create a post!</p>
      </div>
      <nav>
        <button onClick={() => setView("post")}>Post</button>
        <button onClick={() => setView("img")}>Img</button>
        <button onClick={() => setView("link")}>link</button>
      </nav>
      <span>{content}</span>
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

function CreatePostFullPost() {
  const [form, setForm] = useState({
    title: "",
    postarea: "",
    tags: "",
    submit: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <form className="input-form-wrapper">
        <InputComp
          type="text"
          onChange={handleChange}
          name="Title"
          placeholder="Title"
          className="input-test"
        />
        <textarea
          placeholder="Write a post"
          name="post-area"
          rows="6"
          cols="50"
          onChange={handleChange}
        ></textarea>
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
    </div>
  );
}
function CreatePostFullLink() {
  const [form, setForm] = useState({
    title: "",
    postarea: "",
    tags: "",
    submit: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <form className="input-form-wrapper">
        <InputComp
          type="text"
          onChange={handleChange}
          name="Title"
          placeholder="Title"
          className="input-test"
        />
        <InputComp
          type="url"
          onChange={handleChange}
          name="link"
          placeholder="Add Link"
          className="input-test"
        />
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
    </div>
  );
}
function CreatePostFullImage() {
  const [form, setForm] = useState({
    title: "",
    postarea: "",
    tags: "",
    submit: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <form className="input-form-wrapper">
        <InputComp
          type="text"
          onChange={handleChange}
          name="Title"
          placeholder="Title"
          className="input-test"
        />
        <InputComp
          type="file"
          onChange={handleChange}
          name="file"
          placeholder="upload photo"
          className="input-test"
        />
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
    </div>
  );
}
