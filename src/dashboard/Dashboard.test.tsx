import React from 'react';
import { render, wait } from '@testing-library/react';
import { getSessions } from '../sessions/_store/api';
import { sessionRequiredValuesBuilder } from '../_mocks/sessions';
import { HttpMetadataPagingResponse } from '../_http';
import Dashboard from './Dashboard';

jest.mock('../session/_store/api');

const fakeSession = sessionRequiredValuesBuilder();

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
    (getSessions as jest.Mock).mockImplementation(
      () => new Promise(resolve => resolve({ data: [fakeSession], meta: dummyMeta })),
    );

    const { getByText } = render(<Dashboard />);

    await wait(() => {
      expect(getSessions).toHaveBeenCalledTimes(1);
    });
  });
});
