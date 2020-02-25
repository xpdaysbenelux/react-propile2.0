import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { sessionsSelectors } from '../../_store/selectors';
import { sessionsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { IUpdateSessionForm } from '../_models';
import UpdateSessionForm from './EditSessionForm';

const initialForm: IUpdateSessionForm = {
  description: '',
  emailFirstPresenter: '',
  emailSecondPresenter: '',
  subTitle: '',
  title: '',
  xpFactor: 0,
};

const EditSession: FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(sessionsSelectors.isUpdatingSessionLoading);
  const error = useSelector(sessionsSelectors.errorCrudSession);

  const checkFilledValues = (): void => {};

  return (
    <Container as="main" className="left-container">
      <h1>{translations.getLabel('')}</h1>
      <UpdateSessionForm
        buttons={
          <Button href="/sessions" isTextLink>
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: IUpdateSessionForm) => dispatch(new sessionsActions.UpdateSession({ values }))}
      ></UpdateSessionForm>
    </Container>
  );
};

export default EditSession;
