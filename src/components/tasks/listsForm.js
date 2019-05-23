import React, { useState } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Plus as PlusBase } from "styled-icons/feather/Plus";
// from: https://codesandbox.io/s/github/yazeedb/react-hooks-todo

const AddIcon = styled(PlusBase)`
  color: ${props => props.theme.whitetext};
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 0 32px;
  border: 1px solid ${props => props.theme.darkgrey};
  margin: 8px 2px 4px 2px;
  padding-left: 4px;
  background: ${props => props.theme.borderdark};
`;

const Input = styled.input.attrs({ type: "text" })`
  flex: 1;
  border: none;
  border-radius: 1px;
  margin: 0px 4px 0px 4px;
  height: 20px;
  color: ${props => props.theme.lightgrey};
  background-color: ${props => props.theme.borderdark};
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  :focus {
    border: none;
    outline: none;
  }
  ::placeholder {
    color: ${props => props.theme.borderlight};
  }
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

const ListsForm = ({ saveTodo, placeholder }) => {
  const { value, reset, onChange } = useInputState();

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        saveTodo(value);
        reset();
      }}
    >
      <label>
        <input type="submit" style={{ display: "none" }} />
        <AddIcon size="24" />
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

export default view(ListsForm);
