import React, { FC, ReactNode } from 'react';
import './errorMessage.scss';

interface Props {
  children: ReactNode;
  isVisible: boolean;
}

const ErrorMessage: FC<Props> = ({ children, isVisible }) => {
  if (isVisible && !!children)
    return (
      <div className={'error-message'}>
        <span>{children}</span>
      </div>
    );
  return null;
};

export default ErrorMessage;
