import { Epic } from 'redux-observable';
import { map } from 'rxjs/operators';
import { LOCATION_CHANGE } from 'connected-react-router';
import { modalActions } from '../../_store/actions';

const locationChangeEpic$: Epic = action$ => action$.ofType(LOCATION_CHANGE).pipe(map(() => new modalActions.CloseModal()));

export default [locationChangeEpic$];
