import "./App.css";
import NavBar from "./components/navbar";
import { PostList } from "./components/PostList";

function App() {
	return (
		<div className="App">
      <NavBar />
			<PostList />
		</div>
	);
}

export default App;
