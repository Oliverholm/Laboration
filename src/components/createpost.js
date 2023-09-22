//Jacob
import React, { useState } from "react";

import "../styles/CreatePost.css";

export function CreatePostComponent() {
  const [alt, setAlt] = useState("part");
  const [view, setView] = useState("post");
  const [form, setForm] = useState({
    title: "",
    postarea: "",
    tags: "",
    submit: "",
  });

  if (alt === "part") {
    return <CreatePostViewPart alt={alt} setAlt={setAlt} setView={setView} />;
  } else if (alt === "post") {
    return (
      <CreatePostViewFull
        view={view}
        setView={setView}
        form={form}
        setForm={setForm}
      />
    );
  } else if (alt === "img") {
    return (
      <CreatePostViewFull
        view={view}
        setView={setView}
        form={form}
        setForm={setForm}
      />
    );
  } else if (alt === "link") {
    return (
      <CreatePostViewFull
        view={view}
        setView={setView}
        form={form}
        setForm={setForm}
      />
    );
  }
}

function CreatePostViewPart({ setAlt, setView }) {
  return (
    <>
      <div className="part-wrapper">
        <label htmlFor="select User" className="part-label">
          Select User
        </label>
        <select name="Users" id="Users">
          <option value="Jonte">Jonte</option>
          <option value="Johanna">Johanna</option>
          <option value="Johan">Johan</option>
          <option value="Jolle">Jolle</option>
          <option value="DragonSlayer">DragonSlayer</option>
          <option value="Julia">Julia</option>
        </select>
        <div>
          <input
            type="text"
            placeholder="Create post"
            className="input-test"
            name="part-input"
            onClick={() => setAlt("post")}
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

function handleChange(e, form, setForm) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
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
