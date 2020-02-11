import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastify.scss';
import { Icon } from './_shared';

const CloseButton: FC<{ closeToast?: () => void }> = ({ closeToast }) => (
  <Icon name="SvgClose" onClick={closeToast || (() => {})} size={2.4} />
);

const Toastify: FC = () => {
  return (
    <ToastContainer
      bodyClassName="toast-body"
      className="toast-container"
      closeButton={<CloseButton />}
      closeOnClick={false}
      position="bottom-right"
      progressClassName="toast-progress"
      toastClassName="toast"
    />
  );
};

export default Toastify;
