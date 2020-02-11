import { HttpMetadataQuery } from '../_http';

export const getQueryParams = (query?: HttpMetadataQuery): string => {
  return query
    ? Object.keys(query).reduce(
        (queryParams, key) => (query[key] ? `${queryParams}${queryParams.length ? '&' : '?'}${key}=${query[key]}` : queryParams),
        '',
      )
    : '';
};
