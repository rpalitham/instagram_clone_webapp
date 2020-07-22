import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./modal.css";

function CustomModal(props) {
  const { className } = props;
  return (
    <div className="modal-container">
      <Modal isOpen={props.open} toggle={props.toggle} className={className}>
        <ModalHeader style={{ borderBottom: "none" }}>{props.name}</ModalHeader>
        <ModalBody>{props.comp}</ModalBody>
      </Modal>
    </div>
  );
}

export default CustomModal;
