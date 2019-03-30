import React from "react";
import { Square } from "styled-icons/feather/Square";

const Filledbox = props => {
  return (
    <div onClick={props.onClick}>
      {props.checked ? (
        <Square
          size="24"
          style={{
            verticalAlign: "middle",
            fill: props.color ? props.color : "transparent"
          }}
        />
      ) : (
        <Square
          size="24"
          style={{
            verticalAlign: "middle"
          }}
        />
      )}
    </div>
  );
};

export default Filledbox;
