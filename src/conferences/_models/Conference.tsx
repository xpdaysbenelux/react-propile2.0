import { IProgram } from '../../programs/_models/';
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

export interface IConferenceForm {
  endDate: string;
  name: string;
  programs?: IProgram[];
  rooms: IRoom[];
  startDate: string;
}
