import { Meh, MoreVertical } from "react-feather";
import "../styles/navbar.css";

function NavBar() {
  return (
    <div className="nav-flex">
      <div className="nav-flex">
        <Meh size={"80px"} color="white" />
        <h1 className="logo-nav">psq</h1>
      </div>
      <div>
        <input type="search" placeholder="Search Our Fake Reddit" />
        <button>Icon</button>
      </div>
      <ul>
        <li></li>
        <li> Icon</li>
        <li> Icon</li>
      </ul>
    </div>
  );
}

export default NavBar;
