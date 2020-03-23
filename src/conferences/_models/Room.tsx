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
