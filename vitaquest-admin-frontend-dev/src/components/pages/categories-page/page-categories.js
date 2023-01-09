import React from "react";
import "./page-categories.css";
import CrudCategories from "../../crud-categories/crud-categories";

class PageCategories extends React.Component {
  render() {
    return (
      <div id="page-admin">
        <CrudCategories />
      </div>
    );
  }
}

export default PageCategories;
