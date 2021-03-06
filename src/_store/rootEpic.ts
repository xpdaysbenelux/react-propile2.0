import { combineEpics } from 'redux-observable';
import authEpics from '../auth/_store/epics';
import rolesEpics from '../roles/_store/epics';
import usersEpics from '../users/_store/epics';
import sessionsEpics from '../sessions/_store/epics';
import conferencesEpics from '../conferences/_store/epics';
import programsEpics from '../programs/_store/epics';
import eventsEpic from '../events/_store/epics';
import modalEpics from '../modal/_store/epics';

const rootEpic = combineEpics(
  ...authEpics,
  ...modalEpics,
  ...rolesEpics,
  ...usersEpics,
  ...sessionsEpics,
  ...conferencesEpics,
  ...programsEpics,
  ...eventsEpic,
);

export default rootEpic;
