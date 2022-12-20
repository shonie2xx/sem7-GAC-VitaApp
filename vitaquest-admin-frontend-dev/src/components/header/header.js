import React from "react";
import "./header.css";

class Header extends React.Component {
  render() {
    return (
      <div id="header" className="flex ">
        <vaadin-icon id="icon" icon="lumo:menu"></vaadin-icon>
        <h3>VitaApp Admin Panel</h3>
      </div>
    );
  }
}

export default Header;
