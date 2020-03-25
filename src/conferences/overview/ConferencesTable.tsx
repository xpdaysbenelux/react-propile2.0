import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTableSort, useInfiniteScroll } from '../../_hooks';
import { IConference } from '../_models';
import { FillMetadataQueryFunction, HttpSortDirection } from '../../_http';
import Table, { TableColumn } from '../../_shared/table/Table';
import { conferencesSelectors } from '../../_store/selectors';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { translations } from '../../_translations';

interface Props {
  data?: IConference[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { label: 'CONFERENCES.NAME', name: 'name', sortable: true },
  { className: 'date-column', label: 'CONFERENCES.START_DATE', name: 'startDate', sortable: true },
  { className: 'date-column', label: 'CONFERENCES.END_DATE', name: 'endDate', sortable: true },
  { className: 'action-column', name: 'edit' },
  { className: 'action-column', name: 'delete' },
];

const ConferencesTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const metadata = useSelector(conferencesSelectors.metadata);

  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ skip: 0, sortBy: column, sortDirection: direction }),
  );

  useInfiniteScroll((skip: number) => setQuery({ skip }), metadata, isLoading);

  function renderRow(conference: IConference): JSX.Element {
    return (
      <Table.Row key={conference.id}>
        <Table.Cell>
          <Link to={{ pathname: `/conferences/${conference.id}` }}>{conference.name}</Link>
        </Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(conference.startDate))}</Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(conference.endDate))}</Table.Cell>
        <Table.Cell>
          <Link to={{ pathname: `/conferences/update-conference/${conference.id}` }}>
            {translations.getLabel('CONFERENCES.OVERVIEW.EDIT')}
          </Link>
        </Table.Cell>
        <Table.Cell>{translations.getLabel('CONFERENCES.OVERVIEW.DELETE')}</Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table
      columns={columns}
      data={data}
      emptyLabel={translations.getLabel('CONFERENCES.OVERVIEW.EMPTY')}
      isLoading={isLoading}
      renderRow={renderRow}
      sortFunctions={sortFunctions}
    />
  );
};

export default ConferencesTable;
