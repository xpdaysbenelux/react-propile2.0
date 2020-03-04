import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { sessionsSelectors } from '../../_store/selectors';
import { sessionsActions } from '../../_store/actions';
import { ICreateSessionForm } from '../_models';
import { Button } from '../../_shared';
import { parseValeusIfNeeded } from '../../_utils/objectHelpers';
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
  const isSubmitting = useSelector(sessionsSelectors.isLoading);
  const error = useSelector(sessionsSelectors.errorCrudSession);

  const parseXpFactorIfNeeded = (givenValues: ICreateSessionForm): ICreateSessionForm => {
    const { xpFactor, ...otherValues } = givenValues;
    const values: ICreateSessionForm = otherValues;
    values.xpFactor = parseValeusIfNeeded(xpFactor);

    return values;
  };

  return (
    <Container as="main" className="left-container">
      <h1>{translations.getLabel('SESSIONS.CREATE.TITLE')}</h1>
      <CreateSessionForm
        buttons={
          <Button href="/sessions" isTextLink theme="secondary">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: ICreateSessionForm) =>
          dispatch(new sessionsActions.CreateSession({ values: parseXpFactorIfNeeded(values) }))
        }
      />
    </Container>
  );
};

export default CreateSession;
