import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useTableSort } from '../../_hooks';
import { IProgram } from '../_models';
import { FillMetadataQueryFunction, HttpSortDirection } from '../../_http';
import Table, { TableColumn } from '../../_shared/table/Table';
import { formatTime, dateFromISOString, formatDate } from '../../_utils/timeHelpers';
import { translations } from '../../_translations';
import { programsActions } from '../../_store/actions';

interface Props {
  data?: IProgram[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { label: 'PROGRAMS.TITLE', name: 'name', sortable: true },
  { className: 'time-column', label: 'PROGRAMS.DATE', name: 'date', sortable: true },
  { className: 'time-column', label: 'PROGRAMS.START_TIME', name: 'startTime', sortable: true },
  { className: 'time-column', label: 'PROGRAMS.END_TIME', name: 'endTime', sortable: true },
  { className: 'action-column', name: 'edit' },
  { className: 'action-column', name: 'delete' },
];

const ProgramsTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const dispatch = useDispatch();
  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ skip: 0, sortBy: column, sortDirection: direction }),
  );

  function renderRow(program: IProgram): JSX.Element {
    return (
      <Table.Row key={program.id}>
        <Table.Cell>
          <Link to={`/programs/${program.id}`}>{program.title}</Link>
        </Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(program.date))}</Table.Cell>
        <Table.Cell>{formatTime(program.startTime)}</Table.Cell>
        <Table.Cell>{formatTime(program.endTime)}</Table.Cell>
        <Table.Cell>
          <Link to={`/programs/edit/${program.id}`}>{translations.getLabel('SHARED.BUTTONS.EDIT')}</Link>
        </Table.Cell>
        <Table.Cell>
          <Link
            onClick={() => {
              dispatch(new programsActions.DeleteProgram({ programId: program.id }));
            }}
            to={`/conferences/${program.conference.id}`}
          >
            {translations.getLabel('SHARED.BUTTONS.DELETE')}
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table
      columns={columns}
      data={data}
      emptyLabel={translations.getLabel('PROGRAMS.OVERVIEW.EMPTY')}
      isLoading={isLoading}
      renderRow={renderRow}
      sortFunctions={sortFunctions}
    />
  );
};

export default ProgramsTable;
