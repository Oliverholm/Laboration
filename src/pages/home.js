import { CreatePostComponent } from "../components/createpost";
import { PostList } from "../components/postlist";

export function Home({
	posts,
	users,
	renderAvatar,
	filteredResults,
	setSinglePost,
}) {
	return (
		<main className="main-content">
			<CreatePostComponent users={users} renderAvatar={renderAvatar} />
			<PostList
				users={users}
				posts={posts}
				filteredResults={filteredResults}
				setSinglePost={setSinglePost}
			/>
		</main>
	);
}
