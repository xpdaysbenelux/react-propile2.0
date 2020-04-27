import React, { FC } from 'react';

import { IEvent } from '../_models/Event';
import './planningTable.scss';

interface Props {
  date: string;
  endTime: string;
  events: IEvent[];
  startTime: string;
}

const PlanningTable: FC<Props> = ({ events, startTime, endTime, date }) => {
  console.log('planning', events);

  return (
    <div className="planning-container">
      <p>Planning</p>
    </div>
  );
};

export default PlanningTable;
