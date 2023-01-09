import React from "react";
import CrudBadges from "../../crud-badges/crud-badges";
import "./page-badges.css";

class PageBadges extends React.Component {
  render() {
    return (
      <div className="flex flex-column" id="page-badges">
        <CrudBadges />
      </div>
    );
  }
}

export default PageBadges;
