import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { Button } from '../../_shared';
import { rolesSelectors } from '../../_store/selectors';
import { IRoleForm } from '../_models';
import { rolesActions } from '../../_store/actions';
import RoleForm from '../edit/RoleForm';

const initialForm: IRoleForm = {
  name: '',
  permissions: {
    conferences: { edit: false, view: false },
    personas: { edit: false, view: false },
    programs: { edit: false, view: false },
    roles: { edit: false, view: false },
    sessions: { admin: false, edit: false, view: false },
    users: { edit: false, view: false },
  },
};

const CreateRole: FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(rolesSelectors.isCreateRoleLoading);
  const error = useSelector(rolesSelectors.errorCrudRoles);

  return (
    <Container as="main" className="left-container">
      <h1>{translations.getLabel('ROLES.CREATE.TITLE')}</h1>
      <RoleForm
        buttons={
          <Button href="/roles" isTextLink theme="secondary">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: IRoleForm) => dispatch(new rolesActions.CreateRole({ values }))}
      />
    </Container>
  );
};

export default CreateRole;
