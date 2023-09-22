import { Search, Menu, GitHub } from "react-feather";
import { useState } from "react";
import "../styles/navbar.css";
import Logo from "../logo.png";

export function NavBar() {
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    // filter((item) => {
    //   return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
  };
  return (
    <div className="nav">
      <img className="logo" src={Logo} width={"100px"} alt="Team Logo" />
      <div className="flex-c">
        <span className="flex span">
          <input
            className="nav-searchbar "
            type="search"
            placeholder="Search Posts"
            value={searchInput}
            onChange={(e) => {
              searchItems(e.target.value);
            }}
          />
          <button className="btn-icon">
            <Search size={"25px"} className="icon" />
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
          Playstation <br /> <span>Our founders</span>
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

// const filterPosts = posts.filter((item) => {
//   return item.includes(query) || item.includes(query);
// });
export default NavBar
