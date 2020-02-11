import React, { FC } from 'react';
import { translations } from '../../_translations';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import './timestamps.scss';

interface Props {
  entity: {
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
  };
}

const Timestamps: FC<Props> = ({ entity }) => {
  const { createdAt, createdBy, updatedAt, updatedBy } = entity;
  return (
    <div className="timestamps">
      {createdAt && (
        <div>
          {translations.getLabel('SHARED.DETAIL.CREATED_AT_BY', {
            date: formatDate(dateFromISOString(createdAt), 'dd/MM/yyyy HH:mm'),
            name: createdBy,
          })}
        </div>
      )}
      {updatedAt && (
        <div>
          {translations.getLabel('SHARED.DETAIL.UPDATED_AT_BY', {
            date: formatDate(dateFromISOString(updatedAt), 'dd/MM/yyyy HH:mm'),
            name: updatedBy,
          })}
        </div>
      )}
    </div>
  );
};

export default Timestamps;
