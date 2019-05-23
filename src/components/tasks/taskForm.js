import React, { useState } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import { Plus } from "styled-icons/feather/Plus";
// from: https://codesandbox.io/s/github/yazeedb/react-hooks-todo

const Input = styled.input.attrs({ type: "text" })`
  flex: 1;
  border: none;
  border-radius: 1px;
  margin-left: 12px;
  padding: 2px;
  background: ${props => props.theme.whitetext};
  :focus {
    border: none;
    outline: none;
  }
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex: 0 0 32px;
  align-items: center;
  background: ${props => props.theme.whitetext};
  border: 1px solid #e4e7eb;
  margin: 8px 2px 4px 2px;
  padding-left: 4px;
`;

const useInputState = () => {
  const [value, setValue] = useState("");

  return {
    value,
    onChange: event => {
      setValue(event.target.value);
    },
    reset: () => setValue("")
  };
};

const TaskForm = ({ submitFcn, placeholder }) => {
  const { value, reset, onChange } = useInputState();

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        submitFcn(value);
        reset();
      }}
    >
      <label>
        <input type="submit" style={{ display: "none" }} />
        <Plus size="24" />
      </label>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </Form>
  );
};

export default view(TaskForm);
