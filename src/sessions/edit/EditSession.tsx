import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { sessionsSelectors } from '../../_store/selectors';
import { sessionsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { IUpdateSessionForm, SessionDuration, SessionExpierenceLevel, SessionState, SessionTopic, SessionType } from '../_models';
import UpdateSessionForm from './EditSessionForm';

const initialForm: IUpdateSessionForm = {
  description: '',
  duration: SessionDuration.HalfHour,
  emailFirstPresenter: '',
  emailSecondPresenter: '',
  expierenceLevel: SessionExpierenceLevel.Novice,
  goal: '',
  intendedAudience: [],
  laptopsRequired: true,
  materialDescription: '',
  materialUrl: '',
  maxParticipants: 50,
  neededMaterials: '',
  otherLimitations: '',
  outline: '',
  roomSetup: '',
  sessionState: SessionState.Draft,
  shortDescription: '',
  subTitle: '',
  title: '',
  topic: SessionTopic.TechnologyAndTechnique,
  type: SessionType.HandsOn,
  xpFactor: 0,
};

const EditSession: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isSubmitting = useSelector(sessionsSelectors.isUpdatingSessionLoading);
  const error = useSelector(sessionsSelectors.errorCrudSession);

  // const checkFilledValues = (): void => {};

  return (
    <Container as="main" className={classnames('left-container', 'edit-session')}>
      <h1>{translations.getLabel('SESSIONS.EDIT.TITLE', { sessionTitle: 'TestSession' })}</h1>
      <UpdateSessionForm
        buttons={<Button href="/sessions">{translations.getLabel('SHARED.BUTTONS.CANCEL')}</Button>}
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        sessionId={id}
        submitForm={(values: IUpdateSessionForm) => dispatch(new sessionsActions.UpdateSession({ sessionId: id, values }))}
      ></UpdateSessionForm>
    </Container>
  );
};

export default EditSession;
