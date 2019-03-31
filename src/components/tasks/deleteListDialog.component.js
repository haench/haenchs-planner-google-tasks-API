import React from "react";
import Modal from "react-responsive-modal";
import { view } from "react-easy-state";
import Button from "./Button.styled";

const DeleteListDialog = ({
  isOpen,
  onClose,
  deleteList,
  listTitle,
  ...props
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      center={true}
      closeIconSize={24}
    >
      <h5>Delete list "{listTitle}" ?</h5>
      <Button onClick={deleteList}>Delete</Button>
      <Button onClick={onClose}>Cancel</Button>
    </Modal>
  );
};

export default view(DeleteListDialog);
