import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from '../styles.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, close }) => {
  const closeModal = ({ target, currenttarget, code }) => {
    if (target === currenttarget || code === 'Escape') {
      this.props.close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return document.removeEventListener('keydown', closeModal);
  }, []);

  return createPortal(
    <div className={styles.Overlay} onClick={closeModal}>
      <span className={styles.closeButton} onClick={close}>
        X
      </span>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};
