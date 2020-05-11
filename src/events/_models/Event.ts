import { SessionDuration, IPresenter } from '../../sessions/_models';

export const eventMaxDuration = 150;

export interface IEvent {
  comment?: string;
  endTime: string;
  id: string;
  program: {
    id: string;
  };
  room?: {
    id: string;
    maxParticipants: number;
  };
  session?: {
    duration: SessionDuration;
    firstPresenter: IPresenter;
    id: string;
    maxParticipants: number;
    secondPresenter: IPresenter;
    title: string;
  };
  spanRow: boolean;
  startTime: string;
  title?: EventTitle;
}

export interface IEventForm {
  comment?: string;
  endTime: string;
  programId: string;
  roomId?: string;
  sessionId?: string;
  spanRow: boolean;
  startTime: string;
  title?: string;
}

export enum EventTitle {
  Break = 'BREAK',
  Closing = 'CLOSING',
  CoffeeBreak = 'COFFEE_BREAK',
  ConferenceDinner = 'CONFERENCE_DINNER',
  Dinner = 'DINNER',
  Drinks = 'DRINKS',
  EveningProgramme = 'EVENING_PROGRAMME',
  Lunch = 'LUNCH',
  Plenary = 'PLENARY',
  Registration = 'REGISTRATION',
  RegistrationAndCoffee = 'REGISTRATION_AND_COFFEE',
  Welcome = 'WELCOME',
}
