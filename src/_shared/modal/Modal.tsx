import React, { FC, ReactNode } from 'react';
import { Modal as SemanticModal } from 'semantic-ui-react';
import Icon from '../icon/Icon';
import './modal.scss';

interface Props {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  onOpen?: () => void;
  open: boolean;
  trigger?: ReactNode;
}

const Modal: FC<Props> & { Actions; Content; Header } = ({ className, open, onOpen, onClose, trigger, children }) => {
  return (
    <SemanticModal
      className={`base-modal ${className}`}
      closeIcon={<Icon className="close-icon" name="SvgClose" size={2.4} />}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      trigger={trigger}
    >
      {children}
    </SemanticModal>
  );
};

Modal.Header = SemanticModal.Header;
Modal.Content = SemanticModal.Content;
Modal.Actions = SemanticModal.Actions;

export default Modal;
