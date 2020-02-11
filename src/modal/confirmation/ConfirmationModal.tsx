import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { IConfirmationModalData } from '../_models';
import { Button, Modal } from '../../_shared';
import { translations } from '../../_translations';
import { modalActions } from '../../_store/actions';

interface Props {
  data?: IConfirmationModalData;
}

const ConfirmationModal: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const cancelModal = () => {
    if (data.cancelAction) dispatch(data.cancelAction());
    dispatch(new modalActions.CloseModal());
  };

  const confirmModal = () => {
    dispatch(data.confirmAction());
    dispatch(new modalActions.CloseModal());
  };

  return (
    <Modal onClose={cancelModal} open>
      <Modal.Header>{data.title}</Modal.Header>
      <Modal.Content>
        <p>{data.content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={cancelModal}>{translations.getLabel('SHARED.BUTTONS.CANCEL')}</Button>
        <Button onClick={confirmModal} primary>
          {data.confirmText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmationModal;
