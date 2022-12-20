import React from "react";
import "./crud-challenges.css";
import "@vaadin/crud";
import "@vaadin/text-field";
import "@vaadin/form-layout";
import "@vaadin/combo-box";
import { protectedResources } from "../../authConfig.js";
import { MsalContext } from "@azure/msal-react";
import {
  getAllChallenges,
  updateChallenge,
  addChallenge,
  deleteChallengeById,
} from "../../services/challengeService";
import { LoaderSpinner } from "../loader-spinner/loader-spinner";

class CrudChallenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined,
    };
    this.crud = React.createRef();
  }

  static contextType = MsalContext;

  componentDidMount() {
    this.crud.current.addEventListener("delete", (e) =>
      this.deleteChallenge(e)
    );
    this.getAllChallenges();
  }

  componentWillUnmount() {
    this.crud.current.removeEventListener("delete", (e) =>
      this.deleteChallenge(e)
    );
  }

  async getAccessToken() {
    if (this.context.accounts.length > 0) {
      var account = this.context.accounts[0];

      var response = await this.context.instance.acquireTokenSilent({
        scopes: protectedResources.apiChallenge.scopes,
        account: account,
      });
      return response.accessToken;
    }
  }

  async getAllChallenges() {
    var accessToken = await this.getAccessToken();
    var challenges = await getAllChallenges(accessToken);
    this.setState({ items: challenges });
  }

  async updateChallenge(challenge) {
    var accessToken = await this.getAccessToken();
    var updatedChallenge = await updateChallenge(accessToken, challenge);
  }

  async addChallenge(challenge) {
    var accessToken = await this.getAccessToken();
    var newChallenge = await addChallenge(accessToken, challenge);
    this.state.items.push(newChallenge);
  }

  async deleteChallenge(e) {
    if (!e.detail.item) return;
    var accessToken = await this.getAccessToken();
    var deleted = await deleteChallengeById(accessToken, e.detail.item.id);
  }

  render() {
    return (
      <vaadin-crud
        ref={this.crud}
        include="title, description, reward, start date, end date"
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
          <vaadin-text-field
            label="reward"
            path="reward"
            required
          ></vaadin-text-field>
          <vaadin-text-field
            label="start date"
            path="startDate"
            required
          ></vaadin-text-field>
          <vaadin-text-field
            label="end date"
            path="endDate"
            required
          ></vaadin-text-field>
        </vaadin-form-layout>
      </vaadin-crud>
    );
  }
}

export default CrudChallenges;
