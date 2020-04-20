import { IProgramForm, programDateStartTime } from '../_models';
import {
  ISOStringFromDate,
  dateTimeFromString,
  getDateAndCustomTimeString,
  dateStringFromISOString,
  getCombinedDateTimeString,
} from '../../_utils/timeHelpers';

export function handleProgramFormBeforeSubmit(givenValues: IProgramForm): IProgramForm {
  const { date, startTime, endTime, title, conferenceId } = givenValues;
  const values: IProgramForm = { conferenceId, date, endTime, startTime, title };

  values.date = ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(date, programDateStartTime)));

  if (
    dateStringFromISOString(startTime) !== dateStringFromISOString(date) ||
    dateStringFromISOString(endTime) !== dateStringFromISOString(date)
  ) {
    values.startTime = ISOStringFromDate(dateTimeFromString(getCombinedDateTimeString(date, startTime)));
    values.endTime = ISOStringFromDate(dateTimeFromString(getCombinedDateTimeString(date, endTime)));
  }

  return values;
}
