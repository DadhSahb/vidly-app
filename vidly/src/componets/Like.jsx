import React from "react";

export default function Like(props) {
  let classes = "fa fa-heart";
  if (!props.like) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
      onClick={props.onClick}
    ></i>
  );
}
