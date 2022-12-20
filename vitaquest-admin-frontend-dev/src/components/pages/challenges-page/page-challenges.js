import React from "react";
import "./page-challenges.css";
import CrudChallenges from "../../crud-challenges/crud-challenges";

class PageChallenges extends React.Component {
  render() {
    return (
      <div className="flex flex-column" id="page-challenges">
        <CrudChallenges />
      </div>
    );
  }
}

export default PageChallenges;
