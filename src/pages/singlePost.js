import { useEffect, useState } from "react";
import "../styles/SinglePost.css";
import { BackButton } from "../components/backButton";
import { PostListButton } from "../components/postlist";
import { MessageSquare, Flag, ArrowDown, ArrowUp } from "react-feather";

export function SinglePost({
  post,
  users,
  reactionsImport,
  commentsOnPost,
  setCommentsOnPost,
}) {
  const [newComment, setNewComment] = useState("");
  const [selectedUser, setSelectedUser] = useState(1);
  const [vote, setVote] = useState(0);
  const [reactions, setReactions] = useState(reactionsImport);
  const regularColor = "rgba(75, 76, 79, 0.8)";

  const { id, userId, title, body, tags } = post;

  const AvatarPathFunc = (username) => {
    const avatarPath = `https://robohash.org/` + username + "?set=set4";
    return avatarPath;
  };

  const fetchComments = () => {
    getCommentsOfPost().then((comments) => {
      console.log(comments);
      setCommentsOnPost(comments.comments);
    });
  };

  const upvote = (e) => {
    e.stopPropagation();
    vote === 0 ? setVote(1) : setVote(0);
  };
  const downvote = (e) => {
    e.stopPropagation();
    vote === -1 ? setVote(0) : setVote(-1);
  };

  // uppercase funktion
  const toUpper = (string) => {
    if (!string) {
      return;
    } else {
      return string.replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  async function getCommentsOfPost() {
    let result = await fetch("https://dummyjson.com/comments/post/" + id);
    let comments = await result.json();
    return comments;
  }

  useEffect(() => {
    if (post.newPost === true) {
      setCommentsOnPost([]);
    } else {
      fetchComments();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.newPost) {
      console.log(selectedUser);
      setCommentsOnPost([
        {
          id: undefined,
          body: newComment,
          user: {
            id: selectedUser,
            username: users[selectedUser - 1].username,
          },
          postId: post.id,
        },
        ...commentsOnPost,
      ]);
    } else {
      fetch("https://dummyjson.com/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: newComment,
          postId: post.id,
          userId: selectedUser,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCommentsOnPost([data, ...commentsOnPost]);
        });
    }
  };

  return (
    <section className="post-section">
      <BackButton />
      {!post || !users ? (
        <div className="post-placeholder">
          <h3>Posts haven't loaded yet...</h3>
        </div>
      ) : (
        <div>
          <article className="post">
            <div className="post-top">
              <div className="post-user-container">
                <img
                  className="post-avatar"
                  src={AvatarPathFunc(users[post.userId - 1].username)}
                />
                <span className="post-username">
                  Posted by:{" "}
                  <span>{toUpper(users[post.userId - 1].username)}</span>
                </span>
              </div>
              <div className="tag-container">
                {tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {toUpper(tag)}
                  </span>
                ))}
              </div>
            </div>
            <p>{body}</p>
            <div className="post-lower">
              <div className="post-reactions">
                <PostListButton
                  reaction="positive"
                  onClick={(e) => {
                    upvote(e);
                  }}
                  icon={
                    <ArrowUp
                      size={20}
                      color={vote === 1 ? "green" : regularColor}
                      className="positive"
                    />
                  }
                />
                <span className="post-reaction-counter">
                  {reactions + vote}
                </span>
                <PostListButton
                  reaction="negative"
                  onClick={(e) => {
                    downvote(e);
                  }}
                  icon={
                    <ArrowDown
                      size={20}
                      color={vote === -1 ? "red" : regularColor}
                      className="negative"
                    />
                  }
                />
              </div>
              <div className="post-report">
                <PostListButton icon={<Flag size={20} />} content="Report" />
              </div>
            </div>
          </article>
          <div className="Comments">
            {!commentsOnPost ? (
              <div>
                <form onSubmit={handleSubmit} className="comment-form">
                  <label htmlFor="select-user" className="new-comment-label">
                    Select User
                  </label>
                  <select
                    onChange={(e) => setSelectedUser(parseInt(e.target.value))}
                    name="Users"
                    id="select-user"
                    className="create-post-selector"
                  >
                    {users.map((user, idx) => {
                      return (
                        <option key={idx} value={user.id}>
                          {user.username}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    className="new-comment-input"
                    placeholder="Comment?"
                    value={newComment}
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button type="submit" className="new-comment-btn">
                    Send Comment
                  </button>
                </form>
                <div className="comment">
                  <h2>Inga Kommentarer</h2>
                </div>
              </div>
            ) : (
              <div className="comment-counter">
                <form onSubmit={handleSubmit} className="comment-form">
                  <label htmlFor="select-user" className="new-comment-label">
                    Select User
                  </label>
                  <select
                    onChange={(e) => setSelectedUser(parseInt(e.target.value))}
                    name="Users"
                    id="select-user"
                    className="create-post-selector"
                  >
                    {users.map((user, idx) => {
                      return (
                        <option key={idx} value={user.id}>
                          {user.username}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    className="new-comment-input"
                    placeholder="Comment?"
                    value={newComment}
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button type="submit" className="new-comment-btn">
                    Send Comment
                  </button>
                </form>
                {commentsOnPost.length === 0 ? null : (
                  <div>
                    {commentsOnPost.map((comment, idx) => (
                      <div key={idx} className="comment">
                        <div className="post-user-container">
                          <img
                            className="post-avatar"
                            src={AvatarPathFunc(comment.user.username)}
                            alt={`Avatar of ${comment.user.username}`}
                          />
                          <span className="post-username">
                            Posted by:{" "}
                            <span>{toUpper(comment.user.username)}</span>
                          </span>
                        </div>
                        <p>{comment.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
