import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useTableSort } from '../../_hooks';
import { IProgram } from '../_models';
import { FillMetadataQueryFunction, HttpSortDirection } from '../../_http';
import Table, { TableColumn } from '../../_shared/table/Table';
import { formatTime } from '../../_utils/timeHelpers';
import { translations } from '../../_translations';

interface Props {
  data?: IProgram[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { label: 'PROGRAMS.TITLE', name: 'name', sortable: true },
  { className: 'time-column', label: 'PROGRAMS.START_TIME', name: 'startTime', sortable: true },
  { className: 'time-column', label: 'PROGRAMS.END_TIME', name: 'endTime', sortable: true },
  { className: 'action-column', name: 'edit' },
  { className: 'action-column', name: 'delete' },
];

const ProgramsTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ skip: 0, sortBy: column, sortDirection: direction }),
  );

  function renderRow(program: IProgram): JSX.Element {
    return (
      <Table.Row key={program.id}>
        <Table.Cell>
          <Link to={`/programs/${program.id}`}>{program.title}</Link>
        </Table.Cell>
        <Table.Cell>{formatTime(program.startTime)}</Table.Cell>
        <Table.Cell>{formatTime(program.endTime)}</Table.Cell>
        <Table.Cell>
          <Link to={`/programs/update-program/${program.id}`}>{translations.getLabel('PROGRAMS.OVERVIEW.EDIT')}</Link>
        </Table.Cell>
        <Table.Cell>{translations.getLabel('PROGRAMS.OVERVIEW.DELETE')}</Table.Cell>
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
