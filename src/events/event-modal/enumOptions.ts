import { EventTitle } from '../_models';
import { translations } from '../../_translations';

export const eventTitleOptions = [
  {
    key: EventTitle.Welcome,
    text: translations.getLabel('EVENTS.EVENT_TITLES.WELCOME'),
    value: EventTitle.Welcome,
  },
  {
    key: EventTitle.Registration,
    text: translations.getLabel('EVENTS.EVENT_TITLES.REGISTRATION'),
    value: EventTitle.Registration,
  },
  {
    key: EventTitle.RegistrationAndCoffee,
    text: translations.getLabel('EVENTS.EVENT_TITLES.REGISTRATION_AND_COFFEE'),
    value: EventTitle.RegistrationAndCoffee,
  },
  {
    key: EventTitle.CoffeeBreak,
    text: translations.getLabel('EVENTS.EVENT_TITLES.COFFEE_BREAK'),
    value: EventTitle.CoffeeBreak,
  },
  {
    key: EventTitle.Break,
    text: translations.getLabel('EVENTS.EVENT_TITLES.BREAK'),
    value: EventTitle.Break,
  },
  {
    key: EventTitle.Lunch,
    text: translations.getLabel('EVENTS.EVENT_TITLES.LUNCH'),
    value: EventTitle.Lunch,
  },
  {
    key: EventTitle.Plenary,
    text: translations.getLabel('EVENTS.EVENT_TITLES.PLENARY'),
    value: EventTitle.Plenary,
  },
  {
    key: EventTitle.Closing,
    text: translations.getLabel('EVENTS.EVENT_TITLES.CLOSING'),
    value: EventTitle.Closing,
  },
  {
    key: EventTitle.Dinner,
    text: translations.getLabel('EVENTS.EVENT_TITLES.DINNER'),
    value: EventTitle.Dinner,
  },
  {
    key: EventTitle.ConferenceDinner,
    text: translations.getLabel('EVENTS.EVENT_TITLES.CONFERENCE_DINNER'),
    value: EventTitle.ConferenceDinner,
  },
  {
    key: EventTitle.Drinks,
    text: translations.getLabel('EVENTS.EVENT_TITLES.DRINKS'),
    value: EventTitle.Drinks,
  },
  {
    key: EventTitle.EveningProgramme,
    text: translations.getLabel('EVENTS.EVENT_TITLES.EVENING_PROGRAMME'),
    value: EventTitle.EveningProgramme,
  },
];
