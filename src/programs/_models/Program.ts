import { IEvent } from '../../events/_models/';

export const programTimeIntervals = 30;
export const programDefaultStartTime = '08:00';
export const programDefaultEndTime = '20:00';
export const programDateStartTime = '02:01';

export interface IProgram {
  conference: {
    id: string;
    name: string;
  };
  createdAt?: string;
  createdBy?: string;
  date: string;
  endTime: string;
  events?: IEvent[];
  id: string;
  startTime: string;
  title: string;
}

export interface IProgramForm {
  conferenceId: string;
  date: string;
  endTime: string;
  startTime: string;
  title: string;
}
