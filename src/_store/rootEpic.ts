import { combineEpics } from 'redux-observable';
import authEpics from '../auth/_store/epics';
import rolesEpics from '../roles/_store/epics';
import usersEpics from '../users/_store/epics';
import modalEpics from '../modal/_store/epics';

const rootEpic = combineEpics(...authEpics, ...modalEpics, ...rolesEpics, ...usersEpics);

export default rootEpic;
