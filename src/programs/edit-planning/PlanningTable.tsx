import React, { FC } from 'react';

import { useModal } from '../../_hooks';
import { IProgram } from '../_models';
import { IEvent } from '../../events/_models';
import { IRoom } from '../../conferences/_models';
import { dateFromISOString, formatTime } from '../../_utils/timeHelpers';
import { Button } from '../../_shared';
import EventModal from '../../events/event-modal/EventModal';
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
  const { startTime, endTime } = program;
  const selectedEvent: IEvent = null;
  const [renderEventModal, showEventModal] = useModal(modalProps => (
    <EventModal closeModal={modalProps.hideModal} event={selectedEvent} program={program} rooms={rooms} />
  ));

  const timeArray = getHoursArray(dateFromISOString(startTime), dateFromISOString(endTime), 30);

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
        <Button onClick={() => showEventModal()} theme="warning" type="button">
          Add event
        </Button>
      </div>
      <div className="planning-container">
        {generateHeader(rooms)}
        {timeArray.map((time: Date) => {
          return generateRow(time, rooms);
        })}
      </div>
      {renderEventModal()}
    </div>
  );
};

export default PlanningTable;
