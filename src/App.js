import "./App.css";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { NavBar } from "./components/navbar";
import { Home } from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SinglePost } from "./pages/singlePost";
import { NewPost } from "./pages/newPost";
import { userList } from "./utils/usersCache";

function App() {
  const [users, setUsers] = useState(userList);
  const [posts, setPosts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  const [commentsOnPost, setCommentsOnPost] = useState([]);

  const fetchUsers = () => {
    getUsers().then((users) => {
      setUsers(users.users);
    });
  };

  const fetchPosts = () => {
    getPosts().then((posts) => {
      setPosts(posts.posts);
    });
  };

  function renderAvatar(username) {
    const avatarPath = `https://robohash.org/` + username + "?set=set4";
    return avatarPath;
  }

  useEffect(() => {
    fetchUsers();
    if (posts.length === 0) {
      fetchPosts();
    } else {
      return;
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar posts={posts} setFilteredResults={setFilteredResults} />
        <Sidebar posts={posts} setFilteredResults={setFilteredResults} />
        <main className="main-content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  posts={posts}
                  users={users}
                  renderAvatar={renderAvatar}
                  filteredResults={filteredResults}
                  setSinglePost={setSinglePost}
                />
              }
            />
            <Route
              path="/Post"
              element={
                <SinglePost
                  post={singlePost}
                  users={users}
                  reactionsImport={singlePost.reactions}
                  commentsOnPost={commentsOnPost}
                  setCommentsOnPost={setCommentsOnPost}
                />
              }
            />
            <Route
              path="/Create"
              element={
                <NewPost users={users} posts={posts} setPosts={setPosts} />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

async function getPosts() {
  let result = await fetch("https://dummyjson.com/posts?limit=20");
  let posts = await result.json();
  return posts;
}

async function getUsers() {
  let result = await fetch("https://dummyjson.com/users?limit=0");
  let users = await result.json();
  return users;
}

export default App;
