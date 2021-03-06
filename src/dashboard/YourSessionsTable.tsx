import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table, { TableColumn } from '../_shared/table/Table';
import { sessionsSelectors } from '../_store/selectors';
import { ISession } from '../sessions/_models';
import { translations } from '../_translations';

interface Props {
  userId: string;
}

const columns: TableColumn[] = [
  { label: 'SESSIONS.TITLE', name: 'title' },
  { label: 'SESSIONS.PRESENTERS', name: 'presenters' },
  { className: 'edit-column', name: 'edit' },
];

function renderPresenters(session: ISession): JSX.Element {
  return session.secondPresenter ? (
    <Table.Cell>
      {session.firstPresenter?.email} & {session.secondPresenter?.email}
    </Table.Cell>
  ) : (
    <Table.Cell> {session.firstPresenter?.email} </Table.Cell>
  );
}

const YourSessionsTable: FC<Props> = ({ userId }) => {
  const sessions = useSelector(sessionsSelectors.sessionsFromUser(userId));
  const isLoading = useSelector(sessionsSelectors.isLoading);

  function renderRow(session: ISession): JSX.Element {
    return (
      <Table.Row className="your-sessions" key={session.id}>
        <Table.Cell>{session.title}</Table.Cell>
        {renderPresenters(session)}
        <Table.Cell>
          <Link to={{ pathname: `/sessions/edit/${session.id}` }}>{translations.getLabel('SHARED.BUTTONS.EDIT')}</Link>
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
