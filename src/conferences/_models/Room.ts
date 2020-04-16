import { translations } from '../../_translations';

export const roomMaxParticipants = 50;

export interface IRoom {
  createdAt?: string;
  createdBy?: string;
  events?: {
    endTime: Date;
    spanRow: boolean;
    startTime: Date;
    title: string;
  }[];
  id?: string;
  location?: string;
  maxParticipants: number;
  name: string;
}

export const createEmptyRoom = (roomNumber: number): IRoom => {
  return {
    maxParticipants: roomMaxParticipants,
    name: translations.getLabel('CONFERENCES.CREATE.FAKE_ROOM_NAME', { number: roomNumber }),
  };
};
