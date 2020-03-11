import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Table, { TableColumn } from '../_shared/table/Table';
import { sessionsSelectors } from '../_store/selectors';
import { ISession } from '../sessions/_models';
import { translations } from '../_translations';
import { sessionsActions } from '../_store/actions';

interface Props {
  userId: string;
}

const columns: TableColumn[] = [
  { label: 'SESSIONS.TITLE', name: 'title' },
  { label: 'SESSIONS.PRESENTERS', name: 'presenters' },
  { className: 'edit-column', name: 'edit' },
];

const YourSessionsTable: FC<Props> = ({ userId }) => {
  const sessions = useSelector(sessionsSelectors.sessions);
  const isLoading = useSelector(sessionsSelectors.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new sessionsActions.GetSessions({ userId }));
  }, [dispatch, userId]);

  function renderRow(session: ISession): JSX.Element {
    return (
      <Table.Row className="yourSessions" key={session.id}>
        <Table.Cell>{session.title}</Table.Cell>
        {session.secondPresenter ? (
          <Table.Cell>
            {session.firstPresenter?.email} & {session.secondPresenter?.email}
          </Table.Cell>
        ) : (
          <Table.Cell>{session.firstPresenter?.email}</Table.Cell>
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
      className="your-sessions-table"
      columns={columns}
      data={sessions}
      emptyLabel={translations.getLabel('DASHBOARD.OVERVIEW.EMPTY')}
      isLoading={isLoading}
      renderRow={renderRow}
    />
  );
};

export default YourSessionsTable;
