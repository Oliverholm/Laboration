import { Search, Menu, GitHub } from "react-feather";
import { useState } from "react";
import "../styles/navbar.css";
import Logo from "../logo.png";

export function NavBar({ posts, setFilteredResults }) {
	const [searchInput, setSearchInput] = useState("");

	const searchItems = (searchValue) => {
		setSearchInput(searchValue);
		const filterPost = posts.filter((post) => {
			return Object.values(post)
				.join("")
				.toLowerCase()
				.includes(searchInput.toLowerCase());
		});
		setFilteredResults(filterPost);
	};

	return (
		<div className="nav">
			<img className="logo" src={Logo} width={"100px"} alt="Team Logo" />
			<div className="flex-c">
				<span className="flex span">
					<input
						className="nav-searchbar "
						type="text"
						placeholder="Search Posts"
						value={searchInput}
						onChange={(e) => {
							searchItems(e.target.value);
						}}
					/>
					<button className="btn-icon">
						<Search size={"25px"} color="white" className="icon" />
					</button>
				</span>
			</div>
			<DropDown />
		</div>
	);
}

const DropDown = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="menu-container">
			<div
				className="menu-trigger"
				onClick={() => {
					setOpen(!open);
				}}
			>
				<Menu style={{ color: "white" }} className="img" size={"20px"} />
			</div>

			<div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
				<h3>
					Johan Nyman once said that Playstation portable with xbox live deluxe
					edition is a must have in 2025 -Johan Nyman 2023 <br />{" "}
					<span>Our founders</span>
				</h3>
				<ul>
					<DropdownItem text={"Johan"} />
					<DropdownItem text={"Jacob"} />
					<DropdownItem text={"Joel"} />
					<DropdownItem text={"Oliver"} />
				</ul>
			</div>
		</div>
	);
};

function DropdownItem(props) {
	return (
		<li className="dropdownItem">
			<GitHub
				width={"35px"}
				height={"35px"}
				style={{
					color: "#cecece",
				}}
			/>
			<a>{props.text}</a>
		</li>
	);
}

export default NavBar;
