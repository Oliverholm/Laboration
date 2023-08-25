import "./App.css";
import { Sidebar } from "./components/Sidebar.js";
import NavBar from "./components/navbar";
import { PostList } from "./components/PostList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Sidebar />
      <PostList />
    </div>
  );
}

export default App;
