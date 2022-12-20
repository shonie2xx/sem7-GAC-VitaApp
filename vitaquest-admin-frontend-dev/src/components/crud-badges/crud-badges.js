import React, { createRef } from "react";
import "./crud-badges.css";
import "@vaadin/crud";
import "@vaadin/text-field";
import "@vaadin/form-layout";
import "@vaadin/combo-box";
import { protectedResources } from "../../authConfig.js";
import { MsalContext } from "@azure/msal-react";

import { LoaderSpinner } from "../loader-spinner/loader-spinner";

import {
  deleteBadgeById,
  getAllBadges,
  updateBadge,
} from "../../services/badgeService";

class CrudBadges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined,
      categories: undefined,
    };
    this.crud = createRef();
  }

  static contextType = MsalContext;

  componentDidMount() {
    this.crud.current.addEventListener("save", (e) => this.saveBadge(e));
    this.crud.current.addEventListener("delete", (e) => this.deleteBadge(e));
    this.getAllBadges();
  }

  componentWillUnmount() {
    this.crud.current.removeEventListener("save", (e) => this.saveBadge(e));
    this.crud.current.removeEventListener("delete", (e) => this.deleteBadge(e));
  }

  async getAccessToken() {
    if (this.context.accounts.length > 0) {
      var account = this.context.accounts[0];

      var response = await this.context.instance.acquireTokenSilent({
        scopes: protectedResources.apiBadge.scopes,
        account: account,
      });
      return response.accessToken;
    }
  }

  async getAllBadges() {
    var accessToken = await this.getAccessToken();
    var badges = await getAllBadges(accessToken);
    this.setState({ items: badges });
  }

  saveBadge(e) {
    if (!e.detail.item) return;
    if (e.detail.item.id) {
      this.updateBadge(e.detail.item);
    } else {
      this.addBadge(e.detail.item);
    }
  }

  async deleteBadge(e) {
    var token = await this.getAccessToken();
    var badge = e.detail.item;
    deleteBadgeById(token, badge.id);
    var index = this.state.items.findIndex((x) => x.id === badge.id);
    this.state.items.splice(index, 1);
  }

  async updateBadge(badge) {
    var token = await this.getAccessToken();
    var newBadge = await updateBadge(token, badge, badge.imageSet.data);
    var index = this.state.items.findIndex((x) => x.id === newBadge.id);
    this.state.items[index] = newBadge;
  }

  addBadge(badge) {
    console.log("not implemented yet");
  }

  render() {
    return (
      <vaadin-crud
        include="name, description"
        items={JSON.stringify(this.state.items)}
        ref={this.crud}
      >
        <vaadin-form-layout slot="form">
          <vaadin-text-field
            label="name"
            path="name"
            required
          ></vaadin-text-field>
          <vaadin-text-field
            label="description"
            path="description"
            required
          ></vaadin-text-field>
          <vaadin-text-field
            label="base64 image"
            path="imageSet.data"
          ></vaadin-text-field>
        </vaadin-form-layout>
      </vaadin-crud>
    );
  }
}

export default CrudBadges;
