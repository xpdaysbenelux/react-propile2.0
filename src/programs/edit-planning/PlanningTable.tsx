import React, { FC } from 'react';

import { IEvent } from '../_models/Event';
import { IRoom } from '../../conferences/_models';
import { dateFromISOString, formatTime } from '../../_utils/timeHelpers';
import './planningTable.scss';

interface Props {
  date: string;
  endTime: string;
  events: IEvent[];
  rooms: IRoom[];
  startTime: string;
}

function getHoursArray(startTime: Date, endTime: Date, interval: number): Date[] {
  const dateTimeArray: Date[] = [];
  for (let dateTime = new Date(startTime); dateTime <= new Date(endTime); dateTime.setMinutes(dateTime.getMinutes() + interval)) {
    dateTimeArray.push(new Date(dateTime));
  }
  return dateTimeArray;
}

const PlanningTable: FC<Props> = ({ events, startTime, endTime, date, rooms }) => {
  const timeArray = getHoursArray(dateFromISOString(startTime), dateFromISOString(endTime), 30);

  function renderRow(hour: Date, roomsAmount: number): JSX.Element {
    const cells: JSX.Element[] = [];
    for (let rowNumber = 0; rowNumber < roomsAmount; rowNumber++) {
      cells.push(
        <div className={`cell cols-${rooms.length}`}>
          <p>Empty cell</p>
        </div>,
      );
    }

    return (
      <div className="row">
        <div className="hour-cell">
          <p>{formatTime(hour)}</p>
        </div>
        {cells}
      </div>
    );
  }

  return (
    <div className="planning-container">
      <div className="row">
        <div className="hour-cell header"></div>
        {rooms.map((room: IRoom) => {
          return (
            <div className={`header cols-${rooms.length}`} key={room.id}>
              <h4>{room.name}</h4>
            </div>
          );
        })}
      </div>
      {timeArray.map((time: Date) => {
        return renderRow(time, rooms.length);
      })}
    </div>
  );
};

export default PlanningTable;
