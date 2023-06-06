import React from 'react';

function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="buttons">
          <button className="button" onClick={onConfirm}>Confirm</button>
          <button className="button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
