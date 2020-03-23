import { IProgram } from './Program';
import { IRoom } from './Room';

export interface IConference {
  createdAt?: string;
  createdBy?: string;
  endDate: Date;
  id: string;
  name: string;
  programs?: IProgram[];
  rooms: IRoom[];
  startDate: Date;
}

export interface ICreateConferenceForm {
  endDate: Date;
  name: string;
  programs?: IProgram[];
  rooms: IRoom[];
  startDate: Date;
}
