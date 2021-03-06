import { differenceInMinutes } from 'date-fns';

import { translations } from '../_translations';
import { dateFromISOString } from './timeHelpers';

/**
 * All form validators return an error message if they validated to false.
 * When it returns nothing, it validated to true.
 */

function trim(value: string): string {
  return value.replace(/\s/g, '');
}

function isEmptyString(value: string): boolean {
  return !value || trim(value) === '';
}

function isRequired(value: unknown): string {
  const isValid = !isEmptyString(`${value}`);
  return !isValid && translations.getLabel('ERRORS.VALIDATION.REQUIRED');
}

function hasMaxLength(value: string, max: number): string {
  const isValid = value.length <= max;
  return !isValid && translations.getLabel('ERRORS.VALIDATION.MAX_LENGTH', { length: max });
}

function hasMinLength(value: string, min: number): string {
  const isValid = value.length >= min;
  return !isValid && translations.getLabel('ERRORS.VALIDATION.MIN_LENGTH', { length: min });
}

function isNumber(value: string): string {
  const isValid = !Number.isNaN(parseFloat(value));
  return !isValid && translations.getLabel('ERRORS.VALIDATION.NOT_A_NUMBER');
}

function isMax(value: number, max: number): string {
  const isValid = value <= max;
  return !isValid && translations.getLabel('ERRORS.VALIDATION.TOO_HIGH', { max });
}

function isMin(value: number, min: number): string {
  const isValid = value >= min;
  return !isValid && translations.getLabel('ERRORS.VALIDATION.TOO_LOW', { min });
}

function isBetween(value: any, min: number, max: number, fieldName: string): string {
  if (typeof value === 'string') {
    value = parseInt(value);
  }

  let isValid = true;
  if (value < min || value > max) isValid = false;
  return !isValid && translations.getLabel('ERRORS.VALIDATION.MUST_BE_BETWEEN', { fieldName, max, min });
}

function isEmail(email: string): string {
  const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  return !isValid && translations.getLabel('ERRORS.VALIDATION.INVALID_EMAIL');
}

function isPassword(password: string): string {
  // Password requirements: min. 8 characters, at least one uppercase letter, one lowercase letter, and one number.
  const length = 8;
  if (!hasMaxLength(password, length)) return translations.getLabel('ERRORS.VALIDATION.PASSWORD_TOO_SHORT');
  const isValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
  return !isValid && translations.getLabel('ERRORS.VALIDATION.PASSWORD_UNSAFE');
}

function isNotEmptyArray(array: unknown[]): string {
  const isValid = array?.length;
  return !isValid && translations.getLabel('ERRORS.VALIDATION.EMPTY_ARRAY');
}

function durationNotLongerThan(startTime: string, endTime: string, durationInMinutes: number): string {
  const eventDuration = differenceInMinutes(dateFromISOString(endTime), dateFromISOString(startTime));

  const isValid = eventDuration < durationInMinutes;
  return !isValid && translations.getLabel('ERRORS.VALIDATION.DURATION_NOT_LONGER_THAN', { durationInMinutes });
}

export const formValidator = {
  durationNotLongerThan,
  hasMaxLength,
  hasMinLength,
  isBetween,
  isEmail,
  isMax,
  isMin,
  isNotEmptyArray,
  isNumber,
  isPassword,
  isRequired,
};
