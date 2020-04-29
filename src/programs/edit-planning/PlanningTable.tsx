import React, { FC } from 'react';

import { IProgram } from '../_models';
import { IRoom } from '../../conferences/_models';
import { dateFromISOString, formatTime } from '../../_utils/timeHelpers';
import { Button } from '../../_shared';
import './planningTable.scss';

interface Props {
  program: IProgram;
  rooms: IRoom[];
}

function getHoursArray(startTime: Date, endTime: Date, interval: number): Date[] {
  const dateTimeArray: Date[] = [];
  for (let dateTime = new Date(startTime); dateTime <= new Date(endTime); dateTime.setMinutes(dateTime.getMinutes() + interval)) {
    dateTimeArray.push(new Date(dateTime));
  }
  return dateTimeArray;
}

const PlanningTable: FC<Props> = ({ program, rooms }) => {
  const { startTime, endTime, events, date } = program;

  const timeArray = getHoursArray(dateFromISOString(startTime), dateFromISOString(endTime), 30);

  function showAddEventPopup() {
    console.log('add event');
  }

  function generateHeader(rooms: IRoom[]): JSX.Element {
    return (
      <div className="row">
        <div className="hour-cell-header"></div>
        {rooms.map((room: IRoom) => {
          return (
            <div className="header" key={room.id}>
              <h4>{room.name}</h4>
            </div>
          );
        })}
      </div>
    );
  }

  function generateRow(hour: Date, rooms: IRoom[]): JSX.Element {
    return (
      <div className="row" key={`${formatTime(hour)}`}>
        <div className="hour-cell">
          <p>{formatTime(hour)}</p>
        </div>
        {rooms.map((room: IRoom) => {
          return <div className="cell" key={`${formatTime(hour)}-${room.id}`}></div>;
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="actions-header">
        <Button onClick={showAddEventPopup} theme="warning" type="button">
          Add event
        </Button>
      </div>
      <div className="planning-container">
        {generateHeader(rooms)}
        {timeArray.map((time: Date) => {
          return generateRow(time, rooms);
        })}
      </div>
    </div>
  );
};

export default PlanningTable;
