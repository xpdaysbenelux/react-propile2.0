import React from 'react';
import user from '@testing-library/user-event';
import { Simulate } from 'react-dom/test-utils';
import { render } from '../../_utils/testHelpers';
import { translations } from '../../_translations';
import { createUser } from '../_store/api';
import { getRoles } from '../../roles/_store/api';
import { userBuilder } from '../../_mocks/users';
import CreateUser from './CreateUser';

jest.mock('../_store/api');
jest.mock('../../roles/_store/api');

describe('CreateUser component', () => {
  it('should create a user', async () => {
    (createUser as jest.Mock).mockImplementation(() => new Promise(resolve => resolve()));
    const dummyUser = userBuilder();
    (getRoles as jest.Mock).mockImplementation(() => new Promise(resolve => resolve({ data: dummyUser.roles, meta: null })));

    const { getByLabelText, getByText } = render(<CreateUser />);

    const emailInput = getByLabelText(translations.getLabel('USERS.EMAIL'));
    const firstNameInput = getByLabelText(translations.getLabel('USERS.FIRST_NAME'));
    const lastNameInput = getByLabelText(translations.getLabel('USERS.LAST_NAME'));
    const roleDropdown = getByLabelText(translations.getLabel('USERS.ROLE'));
    const createButton = getByText(translations.getLabel('SHARED.BUTTONS.CREATE'), { selector: 'button' });

    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(roleDropdown).toBeInTheDocument();

    user.type(emailInput, dummyUser.email);
    Simulate.change(emailInput);
    user.type(firstNameInput, dummyUser.firstName);
    Simulate.change(firstNameInput);
    user.type(lastNameInput, dummyUser.lastName);
    Simulate.change(lastNameInput);
    // user.selectOptions(roleDropdown, [dummyUser.roles[0].id]);
    // Simulate.change(roleDropdown, { target: {value:dummyUser.roles[0].id} });
    user.click(createButton);
    // TODO: Fix select dropdown

    // expect(createUser).toHaveBeenCalledTimes(1);
    // expect(createUser).toHaveBeenCalledWith({
    //   email: dummyUser.email,
    //   firstName: dummyUser.firstName,
    //   lastName: dummyUser.lastName,
    //   roleIds: [dummyUser.roles[0].id],
    // });
    // await wait(() => {
    // });
  });
});
