import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { modalSelectors } from '../_store/selectors';
import { ModalType, IConfirmationModalData } from './_models';
import ConfirmationModal from './confirmation/ConfirmationModal';

const ReduxDelegatedModal: FC = () => {
  const isOpen = useSelector(modalSelectors.isOpen);
  const data = useSelector(modalSelectors.data);
  const type = useSelector(modalSelectors.type);

  if (!isOpen) return null;
  switch (type) {
    case ModalType.Confirmation:
      return <ConfirmationModal data={data as IConfirmationModalData} />;
    default:
      return null;
  }
};

export default ReduxDelegatedModal;
