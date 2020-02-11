import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../icon/Icon';
import './goBackLink.scss';

interface Props {
  label: string;
  to: string;
}

const GoBackLink: FC<Props> = ({ label, to }) => {
  return (
    <Link className="go-back" to={to}>
      <Icon name="SvgChevronLeft" size={2} />
      <span>{label}</span>
    </Link>
  );
};

export default GoBackLink;
