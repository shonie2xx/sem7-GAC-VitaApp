import React from "react";
import "./crud-categories.css";
import "@vaadin/crud";
import "@vaadin/text-field";
import "@vaadin/crud";
import { protectedResources } from "../../authConfig.js";
import { MsalContext } from "@azure/msal-react";
import { deleteCategoryById, getAllCategories, updateCategory } from "../../services/activityService";
import { addCategory } from "../../services/activityService";

class CrudCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.crud = React.createRef();
  }

  static contextType = MsalContext;

  componentDidMount() {
    this.crud.current.addEventListener("save", (e) => this.saveCategory(e));
    this.crud.current.addEventListener("delete", (e) => this.deleteCategory(e));

    this.getCategories();
  }

  componentWillUnmount() {
    this.crud.current.removeEventListener("save", (e) => this.saveCategory(e));
    this.crud.current.removeEventListener("delete", (e) => this.deleteCategory(e));

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

  async getCategories() {
    var accessToken = await this.getAccessToken();
    var categories = await getAllCategories(accessToken);
    this.setState({ items: categories });
  }

  saveCategory(e) {
    if (!e.detail.item) return;
    if (e.detail.item.id) {
      this.updateCategory(e.detail.item);
    } else {
      this.addCategory(e.detail.item);
    }
  }

  async addCategory(category) {
    var token = await this.getAccessToken();
    var newCategory = await addCategory(token, category.name);
    this.state.items.push(newCategory);
  }

  async updateCategory(category) {
    var accessToken = await this.getAccessToken();
    var updatedCategory = await updateCategory(accessToken, category);
  }

  async deleteCategory(e) {
    if (!e.detail.item) return;
    var accessToken = await this.getAccessToken();
    var deleted = await deleteCategoryById(accessToken, e.detail.item.id);

  }

  render() {
    return (
      <vaadin-crud
        ref={this.crud}
        include="name"
        items={JSON.stringify(this.state.items)}
      ></vaadin-crud>
    );
  }
}

export default CrudCategories;
