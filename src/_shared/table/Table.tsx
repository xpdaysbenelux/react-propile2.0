import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';
import { Table as SemanticTable, Loader } from 'semantic-ui-react';
import { translations } from '../../_translations';
import { SortFunctions } from '../../_hooks/useTableSort';
import './table.scss';

export interface TableColumn {
  className?: string;
  label?: string;
  name: string;
  sortable?: boolean;
}

interface Props {
  columns: TableColumn[];
  data?: object[];
  emptyLabel: string;
  isLoading: boolean;
  renderRow: (item: unknown) => ReactElement;
  sortFunctions?: SortFunctions;
}

const Table: FC<Props> & { Cell; Row } = ({ columns, renderRow, data = [], isLoading, emptyLabel, sortFunctions }) => {
  function renderHeaderCell(column: TableColumn) {
    return (
      <SemanticTable.HeaderCell
        className={classnames(column.className || '', { 'not-sortable': !column.sortable })}
        key={column.name}
        name={column.name}
        onClick={column.sortable ? () => sortFunctions.onChangeSortColumn(column.name) : null}
        sorted={column.sortable ? sortFunctions.getSortDirectionForColumn(column.name) : null}
      >
        {!!column.label && translations.getLabel(column.label)}
      </SemanticTable.HeaderCell>
    );
  }

  function renderBody() {
    if (!isLoading && !data?.length) {
      return (
        <SemanticTable.Row>
          <SemanticTable.Cell className="table-empty" colSpan={columns.length}>
            {emptyLabel}
          </SemanticTable.Cell>
        </SemanticTable.Row>
      );
    }
    return data.map(renderRow);
  }

  return (
    <SemanticTable fixed sortable={columns.some(col => col.sortable)}>
      <SemanticTable.Header>
        <SemanticTable.Row>{columns.map(column => renderHeaderCell(column))}</SemanticTable.Row>
      </SemanticTable.Header>
      <SemanticTable.Body>
        {renderBody()}
        {isLoading && (
          <SemanticTable.Row>
            <SemanticTable.Cell colSpan={columns.length}>
              <Loader active inline="centered" />
            </SemanticTable.Cell>
          </SemanticTable.Row>
        )}
      </SemanticTable.Body>
    </SemanticTable>
  );
};

Table.Row = SemanticTable.Row;
Table.Cell = SemanticTable.Cell;

export default Table;
