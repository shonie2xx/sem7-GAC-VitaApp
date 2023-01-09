import React from "react";
import "./loader-spinner.css";

export class LoaderSpinner extends React.Component {
  render() {
    return (
      <div
        id="loader-spinner-container"
        className="flex flex-justify-center flex-items-center"
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
