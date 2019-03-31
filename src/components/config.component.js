import React from "react";
import styled from "styled-components";
import Modal from "react-responsive-modal";
import configStore from "stores/configStore";
import listsStore from "stores/listsStore";
import { store, view } from "react-easy-state";
import Button from "components/styled.components/button";
import Input from "components/styled.components/input";

const Descrition = styled.span`
  font-size: 14px;
`;

const DefaultGroup = view(() => {
  return (
    <label>
      <Descrition>Group title:</Descrition>
      <Input
        value={configStore.config.defaultGroup.name}
        onChange={event =>
          (configStore.config.defaultGroup.name = event.target.value)
        }
      />
    </label>
  );
});

const UserDefinedGroups = view(({ group }) => {
  return (
    <div>
      <form
        onSubmit={event => {
          listsStore.listTaskLists();
          event.preventDefault();
        }}
      >
        <label>
          <Descrition> Abbrevation:</Descrition>
          <Input
            value={group.abbr}
            onChange={event => (group.abbr = event.target.value)}
            width="3em"
          />
        </label>
        <label>
          <Descrition>Group title:</Descrition>
          <Input
            value={group.name}
            onChange={event => (group.name = event.target.value)}
          />
        </label>

        <Button as="input" type="submit" value="Save" />
        <Button
          onClick={() => {
            configStore.removeGroupFromConfig(group);
            listsStore.listTaskLists();
          }}
        >
          Delete
        </Button>
      </form>
    </div>
  );
});

const AddGroup = view(() => {
  const newGroup = store({
    abbr: "",
    name: ""
  });

  return (
    <form
      onSubmit={event => {
        configStore.addGroupToConfig(newGroup.abbr, newGroup.name);
        newGroup.abbr = "";
        newGroup.name = "";
        listsStore.listTaskLists();
        event.preventDefault();
      }}
    >
      <label>
        <Descrition>Abbrevation:</Descrition>
        <Input
          value={newGroup.abbr}
          onChange={event => (newGroup.abbr = event.target.value)}
          width="3em"
        />
      </label>
      <label>
        <Descrition>Group title:</Descrition>
        <Input
          value={newGroup.name}
          onChange={event => (newGroup.name = event.target.value)}
        />
      </label>
      <Button as="input" type="submit" value="Create" />
    </form>
  );
});

const ConfigDialog = ({ isConfigOpen, closeConfig, ...props }) => {
  return (
    <Modal
      open={isConfigOpen}
      onClose={closeConfig}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      center={true}
      closeIconSize={24}
      onExited={() => configStore.saveConfig()}
    >
      <h3>Group definition</h3>

      <h4>Default group:</h4>
      <DefaultGroup />

      <h4>User defined groups:</h4>
      {configStore.config.groups.map(group => (
        <UserDefinedGroups key={group.id} group={group} />
      ))}

      <h4>Add a group:</h4>
      <AddGroup />
    </Modal>
  );
};

export default view(ConfigDialog);
