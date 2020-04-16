import { IProgram } from '../../programs/_models';
import { IRoom } from './Room';

export const conferenceDefaultStartTime = '02:00';
export const conferenceDefaultEndTime = '23:59';

export interface IConference {
  createdAt?: string;
  createdBy?: string;
  endDate: string;
  id: string;
  name: string;
  programs?: IProgram[];
  rooms: IRoom[];
  startDate: string;
}

export interface IConferenceForm {
  endDate: string;
  name: string;
  programs?: IProgram[];
  rooms: IRoom[];
  startDate: string;
}
