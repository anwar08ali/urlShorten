import React from "react";

const Scroll = (props) => {
  return (
    <div style={{ overflowY: "auto", height: "80vh" }}>{props.children}</div>
  );
};

export default Scroll;
