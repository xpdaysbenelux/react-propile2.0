export interface IProgram {
  createdAt?: string;
  createdBy?: string;
  date: Date;
  endTime: Date;
  events?: {
    endTime: Date;
    spanRow: boolean;
    startTime: Date;
    title: string;
  }[];
  id: string;
  startTime: Date;
}
