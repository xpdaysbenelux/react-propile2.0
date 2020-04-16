export interface IProgram {
  conference: {
    id: string;
    name: string;
  };
  createdAt?: string;
  createdBy?: string;
  date: string;
  endTime: string;
  events?: {
    endTime: Date;
    spanRow: boolean;
    startTime: Date;
    title: string;
  }[];
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
