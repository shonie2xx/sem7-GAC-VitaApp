import React from "react";
import { NavLink } from "react-router-dom";
import "./go-back-button.css";
import "@vaadin/vaadin-lumo-styles/icons.js";

export class GoBackButton extends React.Component {
  constructor(props) {
    super();
    this.state = { to: props.to };
  }

  render() {
    return (
      <NavLink to={this.state.to}>
        <div id="go-back-button" className="flex flex-row flex-items-center">
          <vaadin-icon icon="lumo:arrow-left"></vaadin-icon>Ga terug
        </div>
      </NavLink>
    );
  }
}
