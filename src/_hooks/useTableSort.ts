import { useState } from 'react';
import { HttpSortDirection } from '../_http';

type SemanticSortDirection = 'ascending' | 'descending';

export interface SortFunctions {
  getSortDirectionForColumn: (column: string) => SemanticSortDirection;
  onChangeSortColumn: (column: string) => void;
}

function sortDirectionOpposite(direction: string): HttpSortDirection {
  return direction === HttpSortDirection.Ascending ? HttpSortDirection.Descending : HttpSortDirection.Ascending;
}

function semanticSortDirection(direction: HttpSortDirection): SemanticSortDirection {
  return direction === HttpSortDirection.Ascending ? 'ascending' : 'descending';
}

interface Response {
  sortColumn?: string;
  sortDirection?: HttpSortDirection;
  sortFunctions: SortFunctions;
}

const useTableSort = (
  callback: (column: string, direction: HttpSortDirection) => void,
  initialSortColumn: string = null,
): Response => {
  const [sortColumn, setSortColumn] = useState<string>(initialSortColumn);

  const [sortDirection, setSortDirection] = useState<HttpSortDirection>(HttpSortDirection.Ascending);

  const onChangeSortColumn = (column: string) => {
    const direction = sortColumn === column ? sortDirectionOpposite(sortDirection) : HttpSortDirection.Ascending;
    setSortColumn(column);
    setSortDirection(direction);
    callback(column, direction);
  };

  const getSortDirectionForColumn = (column: string) => (sortColumn === column ? semanticSortDirection(sortDirection) : null);

  return {
    sortColumn,
    sortDirection,
    sortFunctions: {
      getSortDirectionForColumn,
      onChangeSortColumn,
    },
  };
};

export default useTableSort;
