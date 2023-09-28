import { useState } from "react";
import "../styles/Sidebar.css";
import {
	TrendingUp,
	ArrowRight,
	GitHub,
	ArrowDown,
	HelpCircle,
	BookOpen,
	Monitor,
} from "react-feather";
import { categoriesList } from "../utils/constants";

export function Sidebar({ posts, setFilteredResults }) {
	const SBCIcon = <ArrowRight size="1em" className="icon" />;

	const [isActive, setIsActive] = useState(true);
	const [rotateArrow, setRotateArrow] = useState(false);

	const rotate = rotateArrow ? "rotate(180deg)" : "rotate(0)";

	const handleRotate = () => setRotateArrow(!rotateArrow);
	const onClick = () => setIsActive(!isActive);

	const handleCategory = (category) => {
		const filterPost = posts.filter((post) => {
			return post.tags.includes(category.toLowerCase());
		});
		setFilteredResults(filterPost);
	};

	return (
		<aside className="sb-container">
			<section className="sb-top">
				<ul>
					<li className="sb-options" onClick={(e) => setFilteredResults([])}>
						<TrendingUp size={"1.1em"} className="icon" />
						&nbsp; All
					</li>
				</ul>
				<hr className="bottom-border" />
			</section>
			<section className="sb-categories">
				<div className="sb-top-container">
					<h2 id="titles">Categories</h2>
					<button onClick={onClick} className="sb-dropdown-button">
						<ArrowDown
							className="arrow-icon"
							style={{ transform: rotate, transition: "all 0.2s linear" }}
							onClick={handleRotate}
						/>
					</button>
				</div>
				<nav className={`dropdown ${isActive ? "active" : "inactive"}`}>
					<ul>
						{categoriesList.map((category, idx) => (
							<li
								key={idx}
								className="sb-options"
								onClick={() => handleCategory(category)}
							>
								{SBCIcon}&nbsp;&nbsp;
								{category}
							</li>
						))}
					</ul>
				</nav>
			</section>
			<section>
				<hr className="bottom-border" />
				<div className="sb-resources">
					<h3 id="titles">Resources</h3>
					<ul>
						<li className="sb-options">
							<Monitor className="icon" size="1.2em" />
							&nbsp;&nbsp; About PSQ
						</li>
						<li className="sb-options">
							<HelpCircle className="icon" size="1.2em" />
							&nbsp;&nbsp; Help
						</li>
						<li className="sb-options">
							<BookOpen className="icon" size="1.2em" />
							&nbsp;&nbsp; Blog
						</li>
					</ul>
				</div>
			</section>
			<div className="sb-footer">
				<a
					href="https://github.com/Oliverholm/Laboration"
					className="github-logo icon"
				>
					{<GitHub />}
				</a>

				<hr className="bottom-border" />
			</div>
			<footer>
				<span>
					Public Square 2023 <br></br>All rights reserved
				</span>
			</footer>
		</aside>
	);
}
