import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../../_shared';
import { rolesSelectors } from '../../_store/selectors';
import { rolesActions } from '../../_store/actions';

interface Props {
  errorMessage?: string;
  label: string;
  name: string;
  onChange: (value: string[], name: string) => void;
  value: string[];
}

const RolesDropdown: FC<Props> = ({ label, name, value, onChange, errorMessage }) => {
  const dispatch = useDispatch();
  const roles = useSelector(rolesSelectors.roles);

  useEffect(() => {
    dispatch(new rolesActions.GetRoles());
  }, [dispatch]);

  const options = useMemo(
    () =>
      roles?.map(role => ({
        text: role.name,
        value: role.id,
      })),
    [roles],
  );
  return (
    <Dropdown
      errorMessage={errorMessage}
      label={label}
      multiple
      name={name}
      onChange={onChange}
      options={options}
      value={value}
    />
  );
};

export default RolesDropdown;
