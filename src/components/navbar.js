import { Meh, Search, Menu, Moon } from "react-feather";
import { useState } from "react";
import "../styles/navbar.css";

export function NavBar() {
  const [query, setQuery] = useState("");

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  //   const filterPosts = NAMES.filter((item) => {
  //     return item.id.includes(query) || item.id.includes(query);
  //   });

  return (
    <div className="nav-flex">
      <div className="nav-flex">
        <Meh size={"80px"} color="white" />
        <h1 className="logo-nav mt">psq</h1>
      </div>
      <div className="flex-c">
        <span className="flex">
          <input
            className="nav-searchbar "
            type="search"
            placeholder="Search Our Fake Reddit"
            value={query}
          />
          <button onClick={changeHandler} className="btn-icon">
            <Search size={"25px"} className="icon" />
          </button>
        </span>
      </div>

      <span className="flex">
        <span>
          <button style={{ backgroundColor: "#2b2d32" }} className="btn">
            <Moon size={"20px"} />
          </button>
        </span>

        <DropDown />
      </span>
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
          <DropdownItem text={"Jakob"} />
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
      <Meh />
      <a>{props.text}</a>
    </li>
  );
}
