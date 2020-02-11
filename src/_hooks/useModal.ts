import { useCallback, ReactElement } from 'react';
import useToggle from './useToggle';

function useModal(render: (props: { hideModal: () => void }) => ReactElement, onOpen?: () => void, onClose?: () => void) {
  const [isVisible, setVisible] = useToggle(false);

  const showModal = useCallback(() => {
    if (onOpen) onOpen();
    setVisible(true);
  }, [onOpen, setVisible]);

  const hideModal = useCallback(() => {
    if (onClose) onClose();
    setVisible(false);
  }, [onClose, setVisible]);

  const renderModal = useCallback(() => {
    if (isVisible) {
      return render({ hideModal });
    }
    return null;
  }, [isVisible, render, hideModal]);

  return [renderModal, showModal];
}

export default useModal;
