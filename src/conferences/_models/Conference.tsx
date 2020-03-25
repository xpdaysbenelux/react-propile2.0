import { IProgram } from './Program';
import { IRoom } from './Room';

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

export interface ICreateConferenceForm {
  endDate: string;
  name: string;
  programs?: IProgram[];
  rooms: IRoom[];
  startDate: string;
}
