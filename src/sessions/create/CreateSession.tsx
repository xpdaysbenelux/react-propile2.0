import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { sessionsSelectors } from '../../_store/selectors';
import { sessionsActions } from '../../_store/actions';
import { ICreateSessionForm } from '../_models';
import { Button } from '../../_shared';
import CreateSessionForm from './CreateSessionForm';

const initialForm: ICreateSessionForm = {
  description: '',
  emailFirstPresenter: '',
  emailSecondPresenter: '',
  subTitle: '',
  title: '',
  xpFactor: 0,
};

const CreateSession: FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(sessionsSelectors.isCreateSessionLoading);
  const error = useSelector(sessionsSelectors.errorCrudSession);

  const checkOptionalValues = (givenValues: ICreateSessionForm): void => {
    const { subTitle, emailSecondPresenter, xpFactor, ...otherValues } = givenValues;
    const values: ICreateSessionForm = otherValues;

    if (typeof xpFactor === 'string') {
      values.xpFactor = parseInt(xpFactor);
    } else {
      values.xpFactor = xpFactor;
    }

    if (subTitle) values.subTitle = subTitle;
    if (emailSecondPresenter) values.emailSecondPresenter = emailSecondPresenter;

    dispatch(new sessionsActions.CreateSession({ values }));
  };

  return (
    <Container as="main" className="left-container">
      <h1>{translations.getLabel('SESSIONS.CREATE.TITLE')}</h1>
      <CreateSessionForm
        buttons={
          <Button href="/sessions" isTextLink>
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: ICreateSessionForm) => checkOptionalValues(values)}
      />
    </Container>
  );
};

export default CreateSession;
