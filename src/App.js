import "./App.css";
import { CreatePostComponent } from "./components/createpost";

import { useState } from "react";
import {
  CreatePostComponent,
  FullpageCreatePostComponent,
} from "./components/CreatePost";

function App() {
  return (
    <div className="App">
      <CreatePostComponent />
      <FullpageCreatePostComponent />
    </div>
  );
}

export default App;
