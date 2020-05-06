import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import './errorMessage.scss';
import Icon from '../icon/Icon';

interface Props {
  children: ReactNode;
  className?: string;
  isGlobal?: boolean;
  isVisible: boolean;
}

const ErrorMessage: FC<Props> = ({ className, children, isGlobal, isVisible }) => {
  if (isVisible && !!children)
    return (
      <div className={classnames('error-message', { global: isGlobal }, className)}>
        {isGlobal && <Icon name="SvgAlert" size={2.5} />}
        <span>{children}</span>
      </div>
    );
  return null;
};

ErrorMessage.defaultProps = {
  className: '',
  isGlobal: false,
};

export default ErrorMessage;
