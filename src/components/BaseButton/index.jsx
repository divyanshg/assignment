import React from "react";

function BaseButton(props) {
  return <button {...props}>{props.content}</button>;
}

export default BaseButton;
