import React from "react";
import "./crud.css";
import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "@vaadin/crud";
import "@vaadin/text-field";
import "@vaadin/crud";
import { getAllUsers } from "../../services/userService";
import { protectedResources } from "../../authConfig.js";
import { MsalContext } from "@azure/msal-react";


class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  static contextType = MsalContext;


  componentDidMount() {
    this.getUsers();
  }

  async getAccessToken() {
    if (this.context.accounts.length > 0) {
      var account = this.context.accounts[0];

      var response = await this.context.instance.acquireTokenSilent({
        scopes: protectedResources.apiUser.scopes,

        account: account,
      });
      return response.accessToken;
    }
  }

  async getUsers() {
    var accessToken = await this.getAccessToken();
    var users = await getAllUsers(accessToken);
    this.setState({ items: users });
  }

  render() {
    return (
      <vaadin-crud
        include="name, email"
        items={JSON.stringify(this.state.items)}
      ></vaadin-crud>
    );
  }
}

export default Crud;
