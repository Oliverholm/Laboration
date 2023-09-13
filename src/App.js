import "./App.css";
import { useState } from "react";
import { CreatePostComponent } from "./components/createpost";
import { PostList } from "./components/postlist";

function App() {
  return (
    <div className="App">
      <CreatePostComponent />
      <PostList />
    </div>
  );
}

export default App;
