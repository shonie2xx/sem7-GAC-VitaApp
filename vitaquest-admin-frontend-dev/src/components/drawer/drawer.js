import React from "react";
import "./drawer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.buttonStyle = "menu-item";
  }

  getMenuItems() {
    return [
      {
        name: "Gebruikers",
        icon: "lumo:user",
      },
      {
        name: "Nieuwsberichten",
        icon: "lumo:bell",
      },
      {
        name: "Activiteiten",
        icon: "lumo:upload",
      },
      {
        name: "Categorieen",
        label: "Categorieën",
        icon: "lumo:upload",
      },
      {
        name: "Doelen",
        icon: "lumo:play",
      },
      {
        name: "Badges",
        icon: "lumo:user",
      },
      {
        name: "challenges",
        icon: "lumo:user",
      },
      {
        name: "instellingen",
        icon: "lumo:cog",
      },
    ];
  }

  render() {
    return (
      <div className="drawer">
        <div id="drawer-content" className="flex flex-justify-between">
          {this.getMenuItems().map((item) => (
            <NavLink
              key={item.name}
              to={`/${item.name}`}
              className={({ isActive }) =>
                isActive
                  ? (this.buttonStyle = "menu-item-selected")
                  : (this.buttonStyle = "menu-item")
              }
            >
              <div>
                <vaadin-icon id="icon" icon={item.icon}></vaadin-icon>
              </div>
              <div>
                <p>{item.label ? item.label : item.name}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}

export default Drawer;
