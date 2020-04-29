import { IEvent, IEventForm } from '../_models/Event';
import { IProgram } from '../_models';

interface Props {
  closeModal: () => void;
  event?: IEvent;
}

const getInitialForm = (program: IProgram, event?: IEvent): IEventForm => {
  const defaultEndTime = new Date(program.endTime);
  defaultEndTime.setHours(defaultEndTime.getHours() + 1);

  return {
    comment: event?.comment || '',
    endTime: event ? event.endTime : defaultEndTime.toISOString(),
    programId: program.id,
    roomId: event?.room.id || '',
    spanRow: event?.spanRow || false,
    startTime: event ? event.startTime : program.startTime,
    title: event?.title || '',
  };
};
