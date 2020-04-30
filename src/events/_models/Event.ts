export interface IEvent {
  comment?: string;
  endTime: string;
  program: {
    date: string;
    id: string;
  };
  room?: {
    id: string;
    maxParticipants: number;
  };
  session?: {
    id: string;
    maxParticipants: number;
    title: string;
  };
  spanRow: boolean;
  startTime: string;
  title: string;
}

export interface IEventForm {
  comment?: string;
  endTime: string;
  programId: string;
  roomId?: string;
  sessionId?: string;
  spanRow: boolean;
  startTime: string;
  title: string;
}
