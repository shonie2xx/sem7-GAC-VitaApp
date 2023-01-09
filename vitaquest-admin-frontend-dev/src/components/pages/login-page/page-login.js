import React from "react";
import "./page-login.css";
import "@vaadin/login";
import { MsalContext } from "@azure/msal-react";
import { LoginRequest } from "../../../authConfig.js";
import "../../card.css"

class PageLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      callbackId: null,
      firstLogin: null,
    };
  }

  static contextType = MsalContext;

  render() {
    if (this.context.accounts.length > 0) {
      return (
        <div>
          <span>
            There are currently {this.context.accounts.length} users signed in!
          </span>
          <button onClick={() => this.context.instance.logout()}>Logout</button>
        </div>
      );
    } else {
      return (
        <div
          className="page flex flex-justify-center flex-items-center"
          id="page-login"
        >
          <div className="card flex flex-column">
            <div className="card-title flex flex-column">
              <h4>VitaApp</h4>
              <p className="small">
                Deze app vereist login om toegang te krijgen. Log alstublieft
                eerst in.
              </p>
              <button
                className="login-button"
                onClick={() => this.context.instance.loginRedirect(LoginRequest)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PageLogin;
