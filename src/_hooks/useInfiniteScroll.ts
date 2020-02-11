import { useLayoutEffect } from 'react';
import { HttpMetadataPagingResponse } from '../_http';

const SCROLL_OFFSET = 150;

const useInfiniteScroll = (fetchData: (skip: number) => void, metadata: HttpMetadataPagingResponse, isLoading: boolean): void => {
  function shouldFetchData(): boolean {
    if (isLoading) return false;
    if (metadata && metadata.skip === metadata.totalCount) return false;
    return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - SCROLL_OFFSET;
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (shouldFetchData()) {
        const newOffset = (metadata?.skip || 0) + (metadata?.count || 0);
        fetchData(newOffset);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, metadata]);
};

export default useInfiniteScroll;
