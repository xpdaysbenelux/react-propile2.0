import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GoBackLink, Timestamps, Button } from '../../_shared';
import { translations } from '../../_translations';
import { rolesSelectors } from '../../_store/selectors';
import { IRoleForm } from '../_models';
import RoleForm from '../edit/RoleForm';
import { rolesActions } from '../../_store/actions';

const RoleDetail: FC = () => {
  const { id } = useParams();
  const role = useSelector(rolesSelectors.role(id));
  const isDeleteLoading = useSelector(rolesSelectors.isDeleteRoleLoading);
  const isUpdateLoading = useSelector(rolesSelectors.isUpdateRoleLoading);
  const error = useSelector(rolesSelectors.errorCrudRoles);
  const dispatch = useDispatch();

  if (!role) return <Redirect to="/roles" />;

  function renderHeader() {
    return (
      <header>
        <h1>{role.name}</h1>
        <Timestamps entity={role} />
      </header>
    );
  }

  function renderDetailsSection() {
    const initialForm: IRoleForm = {
      name: role.name,
      permissions: role.permissions,
    };
    return (
      <section>
        <RoleForm
          buttons={
            <Button loading={isDeleteLoading} negative onClick={() => dispatch(new rolesActions.DeleteRole({ role }))}>
              {translations.getLabel('ROLES.DETAIL.BUTTON_DELETE')}
            </Button>
          }
          error={error}
          initialForm={initialForm}
          isSubmitting={isUpdateLoading}
          roleId={role.id}
          submitForm={(values: IRoleForm) => dispatch(new rolesActions.UpdateRole({ roleId: role.id, values }))}
        />
      </section>
    );
  }

  return (
    <Container as="main" className="left-container">
      <GoBackLink label={translations.getLabel('ROLES.DETAIL.BACK')} to="/roles" />
      {renderHeader()}
      {renderDetailsSection()}
    </Container>
  );
};

export default RoleDetail;
