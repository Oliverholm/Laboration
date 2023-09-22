import { useState } from "react";
import "../styles/Sidebar.css";
import { TrendingUp, ArrowRight, GitHub, ArrowDown } from "react-feather";

export function Sidebar() {
	const SBCIcon = <ArrowRight size="1em" className="icon" />;

	const [isActive, setIsActive] = useState(true);
	const onClick = () => setIsActive(!isActive);

	const [rotateArrow, setRotateArrow] = useState(false);
	const handleRotate = () => setRotateArrow(!rotateArrow);
	const rotate = rotateArrow ? "rotate(180deg)" : "rotate(0)";

	const categoriesList = [
		"History",
		"Crime",
		"French",
		"Fiction",
		"English",
		"Magical",
		"Mystery",
		"Love",
		"Classic",
	];

	return (
		<aside className="sb-container">
			<section className="sb-top">
				<ul>
					<li className="sb-options">
						<TrendingUp size={"1.1em"} className="icon" />
						&nbsp; Popular
					</li>
				</ul>
				<hr className="bottom-border" />
			</section>
			<section className="sb-categories">
				<h2 id="titles">Categories</h2>

				<button onClick={onClick} className="sb-dropdown-button">
					<ArrowDown
						className="icon"
						style={{ transform: rotate, transition: "all 0.2s linear" }}
						onClick={handleRotate}
					/>
				</button>

				<nav>
					<ul>
						{categoriesList.map((category) => (
							<li key={category} className="sb-options">
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
						<li className="sb-options">{SBCIcon}&nbsp;&nbsp;About PSQ</li>
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

export function sortCategory() {}
