import { useEffect } from 'react';
import useToggle from './useToggle';

interface Response {
  setDirty: () => void;
  showError: boolean;
}

export default function useInputError(message: string): Response {
  const [isDirty, setIsDirty] = useToggle(false);

  useEffect(() => {
    setIsDirty(false);
  }, [message, setIsDirty]);

  return {
    setDirty: () => setIsDirty(true),
    showError: message && !isDirty,
  };
}
