import React from "react";
import "./page-badge-details.css";

import { GoBackButton } from "../../go-back-button/go-back-button";
import { getBadgeById } from "../../../services/badgeService";
import { protectedResources } from "../../../authConfig";
import { MsalContext } from "@azure/msal-react";


export class PageBadgeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badge: {},
      badgeId: null
    };
  }

  static contextType = MsalContext;

  componentDidMount(){
    const id = window.location.pathname.replace("/badges/", "")
    this.getBadge(id);
  }

  async getAccessToken(){
    if (this.context.accounts.length > 0) {
      var account = this.context.accounts[0];

      var response = await this.context.instance
        .acquireTokenSilent({
          scopes: protectedResources.apiBadge.scopes,
          account: account,
        })
      return response.accessToken;
    }
  }

  async getBadge(id) {
    var accessToken = await this.getAccessToken();
    var badge = await getBadgeById(accessToken, id);
    this.setState({ badge: badge });
  }


  render() {
    return (
      <div id="page-badge-details" className="page flex flex-column">
        <GoBackButton to="/badges"></GoBackButton>
        <div id="badge-info" className="flex flex-column">
          <img
            id="badge-image"
            src={require("./badge.png")}
            alt="badge.title"
          />
          <h2>{this.state.badge.name}</h2>
          <p>{this.state.badge.description}</p>
        </div>
        <div id="badge-activities" className="flex flex-column">
          <h3>Gekoppelde activiteiten</h3>
        </div>
      </div>
    );
  }
}