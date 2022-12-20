import React from "react";
import "./crud-activities.css";
import "@vaadin/crud";
import "@vaadin/text-field";
import "@vaadin/form-layout";
import "@vaadin/combo-box";
import { protectedResources } from "../../authConfig.js";
import { MsalContext } from "@azure/msal-react";
import {
  addActivity,
  getAllActivities,
  getAllCategories,
  updateActivity,
  deleteActivityById,
} from "../../services/activityService";
import { LoaderSpinner } from "../loader-spinner/loader-spinner";

class CrudActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined,
      categories: undefined,
    };
    this.crud = React.createRef();
    this.categoryInput = React.createRef();
  }

  static contextType = MsalContext;

  componentDidMount() {
    this.crud.current.addEventListener("save", (e) => this.saveActivity(e));
    this.crud.current.addEventListener("delete", (e) => this.deleteActivity(e));
    this.getAllActivities();
  }

  componentWillUnmount() {
    this.crud.current.removeEventListener("save", (e) => this.saveActivity(e));
    this.crud.current.removeEventListener("delete", (e) =>
      this.deleteActivity(e)
    );
  }

  async getAccessToken() {
    if (this.context.accounts.length > 0) {
      var account = this.context.accounts[0];

      var response = await this.context.instance.acquireTokenSilent({
        scopes: protectedResources.apiActivity.scopes,
        account: account,
      });
      return response.accessToken;
    }
  }

  async getAllActivities() {
    var accessToken = await this.getAccessToken();
    var activities = await getAllActivities(accessToken);
    var categories = await getAllCategories(accessToken);
    this.setState({ items: activities, categories: categories });
  }

  async updateActivity(activity) {
    var accessToken = await this.getAccessToken();
    var updatedActivity = await updateActivity(accessToken, activity);
  }

  async addActivity(activity) {
    var accessToken = await this.getAccessToken();
    var newActivity = await addActivity(accessToken, activity);
    this.state.items.push(newActivity);
  }

  saveActivity(e) {
    var selectedCategory = this.categoryInput.current.selectedItem;
    console.log(e.detail.item);
    if (!e.detail.item) return;
    e.detail.item.category = selectedCategory;
    if (e.detail.item.id) {
      this.updateActivity(e.detail.item);
    } else {
      this.addActivity(e.detail.item);
    }
  }

  async deleteActivity(e) {
    if (!e.detail.item) return;
    var accessToken = await this.getAccessToken();
    var deleted = await deleteActivityById(accessToken, e.detail.item.id);
  }

  render() {
    return (
      <vaadin-crud
        ref={this.crud}
        include="title, description, category.name"
        items={JSON.stringify(this.state.items)}
      >
        <vaadin-form-layout slot="form">
          <vaadin-text-field
            label="title"
            path="title"
            required
          ></vaadin-text-field>
          <vaadin-text-field
            label="description"
            path="description"
            required
          ></vaadin-text-field>

          <vaadin-combo-box
            ref={this.categoryInput}
            colspan="2"
            label="Category"
            path="category"
            item-value-path="category.id"
            item-label-path="name"
            items={JSON.stringify(this.state.categories)}
          ></vaadin-combo-box>
        </vaadin-form-layout>
      </vaadin-crud>
    );
  }
}

export default CrudActivities;
