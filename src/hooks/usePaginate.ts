'use client';

import { PaginatedResponse } from '@/types/common/pagination';
import { useCallback, useState } from 'react';

// ฟังก์ชัน fetch ต้องรองรับ filters
type FetchFunction<T> = (
  page: number,
  size: number,
  filters?: Record<string, any>,
) => Promise<PaginatedResponse<T>>;

export function usePaginatedFetch<T>(fetchFn: FetchFunction<T>, defaultSize = 10) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(defaultSize);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const fetchData = useCallback(
    async (pageNum = page, pageSize = size, newFilters?: Record<string, any>) => {
      setLoading(true);
      try {
        const activeFilters = newFilters ?? filters;
        const res = await fetchFn(pageNum, pageSize, activeFilters);
        setData(res.entities);
        setTotal(res.page_information.count);
        setPage(res.page_information.page);
        setSize(res.page_information.size);
        setFilters(activeFilters); // เก็บ filters ล่าสุดไว้
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, page, size, filters],
  );

  return { data, page, size, total, loading, filters, fetchData, setPage, setSize, setFilters };
}
  