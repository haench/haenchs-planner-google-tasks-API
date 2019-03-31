import React from "react";
import { Check } from "styled-icons/feather/Check";
import { Square } from "styled-icons/feather/Square";

const Checkbox = props => {
  return (
    <div onClick={props.onClick}>
      {props.checked ? (
        <Check
          size="24"
          style={{
            verticalAlign: "middle"
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

export default Checkbox;
