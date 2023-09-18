import { Meh, MoreVertical, Command } from "react-feather";
import "../styles/navbar.css";

export function NavBar() {
  const clickHandler = () => {};
  return (
    <div className="nav-flex">
      <div className="nav-flex">
        <Meh size={"80px"} color="white" />
        <h1 className="logo-nav mt">psq</h1>
      </div>
      <span className="flex">
        <input
          className="nav-searchbar "
          type="search"
          placeholder="Search Our Fake Reddit"
        />  
        <button onClick="" className="btn-icon">
          <Search className="icon" />
        </button>
      </span>

      <span className="flex">
        <span>
          <button className="btn">
            <Command size={"20px"} />
            Get App
          </button>
        </span>
        <button className="btn">Sign In</button>
      </span>
    </div>
  );
}

export default NavBar;
