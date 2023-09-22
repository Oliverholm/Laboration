import "./App.css";
import { useState } from "react";
import { CreatePostComponent } from "./components/createpost";
import { PostList } from "./components/postlist";
import { Sidebar } from "./components/sidebar";
import { NavBar } from "./components/navbar";

function App() {
	return (
		<div className="App">
			<NavBar />
			<CreatePostComponent />
			<Sidebar />
			<PostList />
		</div>
	)
}

export default App;
