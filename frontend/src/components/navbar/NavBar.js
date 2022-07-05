import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <nav className={props.isToggleMenu ? "navbar navbar_opened" : "navbar"}>
      <ul className="navbar__signin">
        <li className="navbar__item">
          <p className="navbar__user-email">{props.email}</p>
        </li>
        <li className="navbar__item">
          <Link
            to={props.to}
            className="navbar__login-link"
            onClick={props.signOut}
          >
            {props.login}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
