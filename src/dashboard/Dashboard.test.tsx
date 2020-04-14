import React from 'react';
import { wait } from '@testing-library/react';
import { render } from '../_utils/testHelpers';
import { getSessions } from '../sessions/_store/api';
import { sessionRequiredValuesBuilder } from '../_mocks/sessions';
import { HttpMetadataPagingResponse } from '../_http';
import { ProfileState } from '../profile/_store/reducer';
import { profileBuilder } from '../_mocks/profile';
import { translations } from '../_translations';
import Dashboard from './Dashboard';

jest.mock('../sessions/_store/api');

const fakeSession = sessionRequiredValuesBuilder();
const fakeProfile = profileBuilder();

const dummyMeta: HttpMetadataPagingResponse = {
  count: 1,
  skip: 0,
  totalCount: 1,
};

describe('Dashboard component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show a table with sessions in wich the user is a presenter', async () => {
    fakeProfile.email = fakeSession.firstPresenter.email;
    const initialProfileState: ProfileState = {
      profile: fakeProfile,
    };
    (getSessions as jest.Mock).mockImplementation(
      () => new Promise(resolve => resolve({ data: [fakeSession], meta: dummyMeta })),
    );

    const { getByText } = render(<Dashboard />, { initialState: { profile: initialProfileState } });

    const titleHeader = getByText(translations.getLabel('SESSIONS.TITLE'));
    const presentersHeader = getByText(translations.getLabel('SESSIONS.PRESENTERS'));

    expect(titleHeader).toBeInTheDocument();
    expect(presentersHeader).toBeInTheDocument();

    await wait(() => {
      expect(getSessions).toHaveBeenCalledTimes(1);

      const title = getByText(fakeSession.title);
      const presenter = getByText(fakeSession.firstPresenter.email);
      const editButton = getByText(translations.getLabel('SHARED.BUTTONS.EDIT'));

      expect(title).toBeInTheDocument();
      expect(presenter).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
    });
  });

  it('should display a message when the user has no sessions', () => {
    const initialProfileState: ProfileState = {
      profile: fakeProfile,
    };
    (getSessions as jest.Mock).mockImplementation(() => new Promise(resolve => resolve({ data: [], meta: dummyMeta })));
    const { queryByText, getByText } = render(<Dashboard />, { initialState: { profile: initialProfileState } });

    const titleHeader = getByText(translations.getLabel('SESSIONS.TITLE'));
    const presentersHeader = getByText(translations.getLabel('SESSIONS.PRESENTERS'));

    expect(titleHeader).toBeInTheDocument();
    expect(presentersHeader).toBeInTheDocument();

    wait(() => {
      const emptyText = getByText(translations.getLabel('DASHBOARD.OVERVIEW.EMPTY'));
      const title = queryByText(fakeSession.title);
      const presenters = queryByText(fakeSession.firstPresenter.email);

      expect(emptyText).toBeInTheDocument();
      expect(title).toBeNull();
      expect(presenters).toBeNull();
    });
  });
});
