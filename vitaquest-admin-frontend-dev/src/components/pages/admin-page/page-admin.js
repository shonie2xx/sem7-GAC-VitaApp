import React from "react";
import "./page-admin.css";
import Crud from "../../crud/crud";

class PageAdmin extends React.Component {
  render() {
    return (
      <div id="page-admin">
        <Crud />
      </div>
    );
  }
}

export default PageAdmin;
