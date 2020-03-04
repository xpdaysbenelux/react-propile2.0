import React from 'react';
import user from '@testing-library/user-event';
import { Simulate } from 'react-dom/test-utils';
import { render } from '../../_utils/testHelpers';
import { translations } from '../../_translations';
import { createSession } from '../_store/api';
import { sessionWithAllValuesBuilder, sessionRequiredValuesBuilder } from '../../_mocks/sessions';
import CreateSession from './CreateSession';

jest.mock('../_store/api');

describe('CreateSession', () => {
  let titleInput = null;
  let subTitleInput = null;
  let emailFirstPresenterInput = null;
  let emailSecondPresenterInput = null;
  let descriptionInput = null;
  let xpFactorInput = null;
  let createButton = null;
  let errorMessage = null;

  beforeEach(() => {
    (createSession as jest.Mock).mockImplementationOnce(() => new Promise(resolve => resolve()));
    const { getByLabelText, getByText } = render(<CreateSession />);

    titleInput = getByLabelText(translations.getLabel('SESSIONS.TITLE') + '*');
    subTitleInput = getByLabelText(translations.getLabel('SESSIONS.SUB_TITLE'));
    emailFirstPresenterInput = getByLabelText(translations.getLabel('SESSIONS.FIRST_PRESENTER') + '*');
    emailSecondPresenterInput = getByLabelText(translations.getLabel('SESSIONS.SECOND_PRESENTER'));
    descriptionInput = getByLabelText(translations.getLabel('SESSIONS.DESCRIPTION') + '*');
    xpFactorInput = getByLabelText(translations.getLabel('SESSIONS.XP_FACTOR'));
    createButton = getByText(translations.getLabel('SHARED.BUTTONS.CREATE'), { selector: 'button' });

    expect(titleInput).toBeInTheDocument();
    expect(subTitleInput).toBeInTheDocument();
    expect(emailFirstPresenterInput).toBeInTheDocument();
    expect(emailSecondPresenterInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(xpFactorInput).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });

  afterEach(() => {
    (createSession as jest.Mock).mockReset();
  });

  it('should create a session with all values filled in', () => {
    const dummySession = sessionWithAllValuesBuilder();

    user.type(titleInput, dummySession.title);
    Simulate.change(titleInput);
    user.type(subTitleInput, dummySession.subTitle);
    Simulate.change(subTitleInput);
    user.type(emailFirstPresenterInput, dummySession.firstPresenter.email);
    Simulate.change(emailFirstPresenterInput);
    user.type(emailSecondPresenterInput, dummySession.secondPresenter.email);
    Simulate.change(emailSecondPresenterInput);
    user.type(descriptionInput, dummySession.description);
    Simulate.change(descriptionInput);
    user.type(xpFactorInput, dummySession.xpFactor.toString());
    Simulate.change(xpFactorInput);

    user.click(createButton);
    expect(createSession).toHaveBeenCalledTimes(1);
    expect(createSession).toHaveBeenCalledWith({
      description: dummySession.description,
      emailFirstPresenter: dummySession.firstPresenter.email,
      emailSecondPresenter: dummySession.secondPresenter.email,
      subTitle: dummySession.subTitle,
      title: dummySession.title,
      xpFactor: dummySession.xpFactor,
    });
  });

  it('should create a session with only the required values', () => {
    const dummySession = sessionRequiredValuesBuilder();

    user.type(titleInput, dummySession.title);
    Simulate.change(titleInput);
    user.type(emailFirstPresenterInput, dummySession.firstPresenter.email);
    Simulate.change(emailFirstPresenterInput);
    user.type(descriptionInput, dummySession.description);
    Simulate.change(descriptionInput);
    user.type(xpFactorInput, dummySession.xpFactor.toString());
    Simulate.change(xpFactorInput);

    user.click(createButton);
    expect(createSession).toHaveBeenCalledTimes(1);
    expect(createSession).toHaveBeenCalledWith({
      description: dummySession.description,
      emailFirstPresenter: dummySession.firstPresenter.email,
      title: dummySession.title,
      xpFactor: dummySession.xpFactor,
    });
  });

  it.skip('should show an error when creating a session with a title that already exists throws an error', () => {
    (createSession as jest.Mock).mockReset();
    (createSession as jest.Mock).mockRejectedValue({
      error: 'SESSION_TITLE_ALREADY_IN_USE',
      message: 'A session with the given title already exists',
    });
    const { getByText } = render(<CreateSession />);

    const dummySession = sessionRequiredValuesBuilder();

    user.type(titleInput, dummySession.title);
    Simulate.change(titleInput);
    user.type(emailFirstPresenterInput, dummySession.firstPresenter.email);
    Simulate.change(emailFirstPresenterInput);
    user.type(descriptionInput, dummySession.description);
    Simulate.change(descriptionInput);
    user.type(xpFactorInput, dummySession.xpFactor.toString());
    Simulate.change(xpFactorInput);

    user.click(createButton);
    expect(createSession).toHaveBeenCalledTimes(1);

    errorMessage = getByText(
      translations.getLabel('SESSIONS.ERRORS.SESSION_TITLE_ALREADY_IN_USE', { selector: '.error-message' }),
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
