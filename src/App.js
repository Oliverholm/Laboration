import "./App.css";
import { useState } from "react";
import { CreatePostComponent } from "./components/createpost";
import { PostList } from "./components/postlist";
import { NavBar } from "./components/navbar";
function App() {
  return (
    <div className="App">
      <NavBar />
      <PostList />
    </div>
  );
}

export default App;
