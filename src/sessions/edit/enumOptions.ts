import { SessionState, SessionType, SessionTopic, SessionDuration, SessionExpierenceLevel } from '../_models';
import { translations } from '../../_translations';

export const stateOptions = [
  {
    key: SessionState.Draft,
    text: translations.getLabel('SESSIONS.ENUMS.STATE.DRAFT'),
    value: SessionState.Draft,
  },
  {
    key: SessionState.Confirmed,
    text: translations.getLabel('SESSIONS.ENUMS.STATE.CONFIRMED'),
    value: SessionState.Confirmed,
  },
  {
    key: SessionState.Canceled,
    text: translations.getLabel('SESSIONS.ENUMS.STATE.CANCELED'),
    value: SessionState.Canceled,
  },
];

export const typeOptions = [
  {
    key: SessionType.HandsOn,
    text: translations.getLabel('SESSIONS.ENUMS.TYPE.HANDS_ON'),
    value: SessionType.HandsOn,
  },
  {
    key: SessionType.Discovery,
    text: translations.getLabel('SESSIONS.ENUMS.TYPE.DISCOVERY'),
    value: SessionType.Discovery,
  },
  {
    key: SessionType.ExperientialLearning,
    text: translations.getLabel('SESSIONS.ENUMS.TYPE.EXPERIENTIAL_LEARNING'),
    value: SessionType.ExperientialLearning,
  },
  {
    key: SessionType.ShortExperience,
    text: translations.getLabel('SESSIONS.ENUMS.TYPE.SHORT_EXPERIENCE'),
    value: SessionType.ShortExperience,
  },
  {
    key: SessionType.Other,
    text: translations.getLabel('SESSIONS.ENUMS.TYPE.OTHER'),
    value: SessionType.Other,
  },
];

export const topicOptions = [
  {
    key: SessionTopic.TechnologyAndTechnique,
    text: translations.getLabel('SESSIONS.ENUMS.TOPIC.TECHNOLOGIE_TECHNIQUE'),
    value: SessionTopic.TechnologyAndTechnique,
  },
  {
    key: SessionTopic.TeamAndIndividual,
    text: translations.getLabel('SESSIONS.ENUMS.TOPIC.TEAM_INDIVIDUAL'),
    value: SessionTopic.TeamAndIndividual,
  },
  {
    key: SessionTopic.ProcessAndImprovement,
    text: translations.getLabel('SESSIONS.ENUMS.TOPIC.PROCESS_IMPROVEMENT'),
    value: SessionTopic.ProcessAndImprovement,
  },
  {
    key: SessionTopic.CustomerAndPlanning,
    text: translations.getLabel('SESSIONS.ENUMS.TOPIC.CUSTOMER_PLANNING'),
    value: SessionTopic.CustomerAndPlanning,
  },
  {
    key: SessionTopic.CasesAndIntros,
    text: translations.getLabel('SESSIONS.ENUMS.TOPIC.CASES_INTROS'),
    value: SessionTopic.CasesAndIntros,
  },
];

export const durationOptions = [
  {
    key: SessionDuration.HalfHour,
    text: translations.getLabel('SESSIONS.ENUMS.DURATION.HALF_HOUR'),
    value: SessionDuration.HalfHour,
  },
  {
    key: SessionDuration.OneHour,
    text: translations.getLabel('SESSIONS.ENUMS.DURATION.ONE_HOUR'),
    value: SessionDuration.OneHour,
  },
  {
    key: SessionDuration.OneAndHalfHour,
    text: translations.getLabel('SESSIONS.ENUMS.DURATION.ONE_HALF_HOUR'),
    value: SessionDuration.OneAndHalfHour,
  },
  {
    key: SessionDuration.TwoAndHalfHour,
    text: translations.getLabel('SESSIONS.ENUMS.DURATION.TWO_HALF_HOUR'),
    value: SessionDuration.TwoAndHalfHour,
  },
];

export const experienceLevelOptions = [
  {
    key: SessionExpierenceLevel.Novice,
    text: translations.getLabel('SESSIONS.ENUMS.EXPERIENCE_LEVEL.NOVICE'),
    value: SessionExpierenceLevel.Novice,
  },
  {
    key: SessionExpierenceLevel.Medium,
    text: translations.getLabel('SESSIONS.ENUMS.EXPERIENCE_LEVEL.MEDIUM'),
    value: SessionExpierenceLevel.Medium,
  },
  {
    key: SessionExpierenceLevel.Expert,
    text: translations.getLabel('SESSIONS.ENUMS.EXPERIENCE_LEVEL.EXPERT'),
    value: SessionExpierenceLevel.Expert,
  },
];
