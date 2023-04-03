import React from "react";
import "../styles/Loading.css";

const Loading = () => {
  return (
    <div
      className="body-container"
      style={{
        height: "100vh",
        paddingTop: "40vh",
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        color: "black",
        textAlign: "center",
      }}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
