import "./App.css";
import { CreatePostComponent } from "./components/CreatePost";
import { Sidebar } from "./components/Sidebar.js";
import NavBar from "./components/navbar";
import { PostList } from "./components/PostList";

function App() {
  return (
    <div className="App">
      <CreatePostComponent />
      <NavBar />
      <Sidebar />
      <PostList />
    </div>
  );
}

export default App;
