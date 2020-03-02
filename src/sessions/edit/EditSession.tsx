import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { sessionsSelectors } from '../../_store/selectors';
import { sessionsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import {
  IUpdateSessionForm,
  SessionDuration,
  SessionExpierenceLevel,
  SessionState,
  SessionTopic,
  SessionType,
  ISession,
} from '../_models';
import UpdateSessionForm from './EditSessionForm';

const getInitialForm = (session: ISession): IUpdateSessionForm => ({
  description: session?.description || '',
  duration: session?.duration || SessionDuration.HalfHour,
  emailFirstPresenter: session?.firstPresenter.email || '',
  emailSecondPresenter: session?.secondPresenter?.email || '',
  expierenceLevel: session?.expierenceLevel || SessionExpierenceLevel.Novice,
  goal: session?.goal || '',
  laptopsRequired: session?.laptopsRequired || true,
  materialDescription: session?.materialDescription || '',
  materialUrl: session?.materialUrl || '',
  maxParticipants: session?.maxParticipants || 50,
  neededMaterials: session?.neededMaterials || '',
  otherLimitations: session?.otherLimitations || '',
  outline: session?.outline || '',
  roomSetup: session?.roomSetup || '',
  sessionState: session?.sessionState || SessionState.Draft,
  shortDescription: session?.shortDescription || '',
  subTitle: session?.subTitle || '',
  title: session?.title || '',
  topic: session?.topic || SessionTopic.TechnologyAndTechnique,
  type: session?.type || SessionType.HandsOn,
  xpFactor: session?.xpFactor || 0,
});

const EditSession: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isSubmitting = useSelector(sessionsSelectors.isUpdatingSessionLoading);
  const error = useSelector(sessionsSelectors.errorCrudSession);
  const session = useSelector(sessionsSelectors.session(id));
  const initialForm = getInitialForm(session);

  return session ? (
    <Container as="main" className={classnames('left-container', 'edit-session')}>
      <h1>{translations.getLabel('SESSIONS.EDIT.TITLE', { sessionTitle: session.title })}</h1>
      <UpdateSessionForm
        buttons={<Button href="/sessions">{translations.getLabel('SHARED.BUTTONS.CANCEL')}</Button>}
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        sessionId={id}
        submitForm={(values: IUpdateSessionForm) => dispatch(new sessionsActions.UpdateSession({ sessionId: id, values }))}
      ></UpdateSessionForm>
    </Container>
  ) : null;
};

export default EditSession;
