import "./App.css";
import { CreatePostComponent } from "./components/createpost";
import { Sidebar } from "./components/sidebar.js";
import NavBar from "./components/navbar";
import { PostList } from "./components/postlist";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Sidebar />
    </div>
  );
}

export default App;
