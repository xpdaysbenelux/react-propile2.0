import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table, { TableColumn } from '../_shared/table/Table';
import { sessionsSelectors } from '../_store/selectors';
import { ISession } from '../sessions/_models';
import { translations } from '../_translations';

const columns: TableColumn[] = [
  { label: 'SESSIONS.TITLE', name: 'title' },
  { label: 'SESSIONS.PRESENTERS', name: 'presenters' },
  { className: 'edit-column', name: 'edit' },
];

const YourSessionsTable: FC = () => {
  const sessions = useSelector(sessionsSelectors.sessions);
  const isLoading = useSelector(sessionsSelectors.isLoading);

  function renderRow(session: ISession): JSX.Element {
    //   const className = classnames({})
    return (
      <Table.Row className="yourSessions" key={session.id}>
        <Table.Cell>{session.title}</Table.Cell>
        {session.secondPresenter ? (
          <Table.Cell>
            {session.firstPresenter.email} & {session.secondPresenter.email}
          </Table.Cell>
        ) : (
          <Table.Cell>{session.firstPresenter.email}</Table.Cell>
        )}
        <Table.Cell>
          <Link to={{ pathname: `/sessions/update-session/${session.id}` }}>
            {translations.getLabel('DASHBOARD.OVERVIEW.EDIT')}
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table
      className="yourSessionsTable"
      columns={columns}
      data={sessions}
      emptyLabel={translations.getLabel('DASHBOARD.OVERVIEW.EMPTY')}
      isLoading={isLoading}
      renderRow={renderRow}
    />
  );
};

export default YourSessionsTable;
