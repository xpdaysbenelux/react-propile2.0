import React, { FC } from 'react';

import { useModal } from '../../_hooks';
import { IProgram } from '../_models';
import { IRoom } from '../../conferences/_models';
import { dateFromISOString, formatTime } from '../../_utils/timeHelpers';
import { Button } from '../../_shared';
import { translations } from '../../_translations';
import EventModal from '../../events/event-modal/EventModal';
import './planningTable.scss';
import { IEvent } from '../../events/_models';

interface Props {
  events: IEvent[];
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

const PlanningTable: FC<Props> = ({ program, rooms, events }) => {
  const { startTime, endTime } = program;
  const [renderEventModal, showEventModal] = useModal(modalProps => (
    <EventModal {...modalProps} program={program} rooms={rooms} />
  ));

  const timeArray = getHoursArray(dateFromISOString(startTime), dateFromISOString(endTime), 30);

  function handleEvent(event: IEvent, room: IRoom, hour: string): JSX.Element {
    if (!event.spanRow && event.room.id === room.id && formatTime(dateFromISOString(event.startTime)) === hour) {
      return <p key={event.id}>{event.session.title}</p>;
    } else if (event.spanRow && formatTime(dateFromISOString(event.startTime)) === hour) {
      console.log(event);
      return <p key={event.id}>{translations.getLabel(`EVENTS.EVENT_TITLES.${event.title}`)}</p>;
    }
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
          return (
            <div className="cell" key={`${formatTime(hour)}-${room.id}`}>
              {events.map((event: IEvent) => handleEvent(event, room, formatTime(hour)))}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="actions-header">
        <Button onClick={() => showEventModal()} theme="warning" type="button">
          {translations.getLabel('EVENTS.ADD_EVENT.TITLE')}
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
