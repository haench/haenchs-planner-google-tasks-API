import React, { useState } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Plus as PlusBase } from "styled-icons/feather/Plus";
// from: https://codesandbox.io/s/github/yazeedb/react-hooks-todo

const AddIcon = styled(PlusBase)`
  color: #fdfdfd;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 0 32px;
  border-top: 1px solid #475760;
  box-sizing: border-box;
`;

const Input = styled.input.attrs({ type: "text" })`
  border: none;
  border-radius: 1px;
  margin: 0px 4px 0px 16px;
  padding-left: 8px;
  height: 20px;
  width: 180px;
  background: #f5f6f7;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  flex: 1;
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
      <Input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <label>
        <input type="submit" style={{ display: "none" }} />
        <AddIcon size="24" />
      </label>
    </Form>
  );
};

export default view(ListsForm);
