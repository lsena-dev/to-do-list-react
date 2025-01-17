import Modal from "react-bootstrap/Modal";
import propTypes from "prop-types";

export default function SimpleModal({ show, close, headModal, children }) {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{headModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

SimpleModal.propTypes = {
  show: propTypes.bool.isRequired, // Corrigido para refletir o tipo correto
  close: propTypes.func.isRequired,
  children: propTypes.node,
  headModal: propTypes.string.isRequired,
};
