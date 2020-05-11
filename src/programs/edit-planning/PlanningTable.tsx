import React, { FC, useState } from 'react';
import { differenceInMinutes } from 'date-fns';

import { useModal } from '../../_hooks';
import { IProgram } from '../_models';
import { IRoom } from '../../conferences/_models';
import { dateFromISOString, formatTime } from '../../_utils/timeHelpers';
import { Button } from '../../_shared';
import { translations } from '../../_translations';
import { IEvent } from '../../events/_models';
import EventModal from '../../events/event-modal/EventModal';
import './planningTable.scss';

interface Props {
  events: IEvent[];
  program: IProgram;
  rooms: IRoom[];
}

function getHoursArray(startTime: Date, endTime: Date, interval: number): Date[] {
  const dateTimeArray: Date[] = [];
  for (let dateTime = new Date(startTime); dateTime < new Date(endTime); dateTime.setMinutes(dateTime.getMinutes() + interval)) {
    dateTimeArray.push(new Date(dateTime));
  }
  return dateTimeArray;
}

const PlanningTable: FC<Props> = ({ program, rooms, events }) => {
  const { startTime, endTime } = program;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [renderEventModal, showEventModal] = useModal(modalProps => (
    <EventModal {...modalProps} event={selectedEvent} program={program} rooms={rooms} />
  ));

  const timeArray = getHoursArray(dateFromISOString(startTime), dateFromISOString(endTime), 30);

  function renderEvent(event: IEvent, room: IRoom, hour: string, roomAmount: number, roomIndex: number): JSX.Element {
    const eventDuration = differenceInMinutes(dateFromISOString(event.endTime), dateFromISOString(event.startTime));
    const eventStartHour = formatTime(dateFromISOString(event.startTime));
    if (!event.spanRow && event.room.id === room.id && eventStartHour === hour) {
      return (
        <div
          className={`event session-event cell-width-${roomAmount} cell-height-${eventDuration}`}
          key={event.id}
          onClick={() => {
            setSelectedEvent(event);
            showEventModal();
          }}
        >
          <p>{event.session.title}</p>
          <p>firstPresenter@mail.com</p>
        </div>
      );
    } else if (event.spanRow && eventStartHour === hour && roomIndex === 0) {
      return (
        <div
          className={`event title-event cell-height-${eventDuration}`}
          key={event.id}
          onClick={() => {
            setSelectedEvent(event);
            showEventModal();
          }}
        >
          <p>{translations.getLabel(`EVENTS.EVENT_TITLES.${event.title}`)}</p>
        </div>
      );
    }
    return null;
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
        {rooms.map((room: IRoom, roomIndex: number) => {
          return (
            <div className="cell" key={`${formatTime(hour)}-${room.id}`}>
              {events.map((event: IEvent) => renderEvent(event, room, formatTime(hour), rooms.length, roomIndex))}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="actions-header">
        <Button
          onClick={() => {
            setSelectedEvent(null);
            showEventModal();
          }}
          theme="warning"
          type="button"
        >
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
