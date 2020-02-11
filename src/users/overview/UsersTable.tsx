import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Table, { TableColumn } from '../../_shared/table/Table';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { FillMetadataQueryFunction, HttpSortDirection } from '../../_http';
import { translations } from '../../_translations';
import { useTableSort, useInfiniteScroll } from '../../_hooks';
import { usersSelectors } from '../../_store/selectors';
import { IUser, UserState } from '../_models';
import { labelForUserState } from '../_utils';

interface Props {
  data?: IUser[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { className: 'email-column', label: 'USERS.EMAIL', name: 'email', sortable: true },
  { label: 'USERS.FIRST_NAME', name: 'firstName', sortable: true },
  { label: 'USERS.LAST_NAME', name: 'lastName', sortable: true },
  { label: 'USERS.OVERVIEW.CREATED_AT', name: 'createdAt', sortable: true },
  { label: 'USERS.OVERVIEW.UPDATED_AT', name: 'updatedAt', sortable: true },
  { label: 'USERS.STATE.TITLE', name: 'state', sortable: true },
];

const UsersTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const metadata = useSelector(usersSelectors.metadata);

  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ skip: 0, sortBy: column, sortDirection: direction }),
  );
  useInfiniteScroll((skip: number) => setQuery({ skip }), metadata, isLoading);

  function renderRow(user: IUser): JSX.Element {
    const className = classnames({ 'greyed-out': user.state === UserState.Inactive });
    return (
      <Table.Row className={className} key={user.email}>
        <Table.Cell>
          <Link to={{ pathname: `/users/${user.id}` }}>{user.email}</Link>
        </Table.Cell>
        <Table.Cell>{user.firstName}</Table.Cell>
        <Table.Cell>{user.lastName}</Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(user.createdAt))}</Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(user.updatedAt))}</Table.Cell>
        <Table.Cell>{labelForUserState(user.state)}</Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table
      columns={columns}
      data={data}
      emptyLabel={translations.getLabel('USERS.OVERVIEW.EMPTY')}
      isLoading={isLoading}
      renderRow={renderRow}
      sortFunctions={sortFunctions}
    />
  );
};

export default UsersTable;
