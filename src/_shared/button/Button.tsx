import React, { FC, ReactNode } from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './button.scss';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  href?: string;
  isTextLink?: boolean;
  loading?: boolean;
  negative?: boolean;
  onClick?: () => void;
  primary?: boolean;
  theme?: 'primary' | 'secondary' | 'warning';
  type?: 'button' | 'submit' | 'reset';
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const THEMES = ['primary', 'secondary', 'warning'];

const Button: FC<Props> = ({ type, isTextLink, primary, children, onClick = noop, disabled, loading, href, negative, theme }) => {
  const selectedTheme = THEMES.includes(theme) ? theme : THEMES[0];
  if (isTextLink) {
    return (
      <Link to={href}>
        <SemanticButton
          as="span"
          className={`btn-${selectedTheme}`}
          disabled={disabled || loading}
          loading={loading}
          primary={primary}
        >
          {children}
        </SemanticButton>
      </Link>
    );
  }
  return (
    <SemanticButton
      className={`btn-${selectedTheme}`}
      disabled={disabled || loading}
      loading={loading}
      negative={negative}
      onClick={onClick}
      primary={primary}
      type={type}
    >
      {children}
    </SemanticButton>
  );
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
