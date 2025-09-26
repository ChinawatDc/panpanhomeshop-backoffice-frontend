'use client';

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

type DataTableProps<T extends { id: number }> = {
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean;            // optional
  page?: number;                // optional
  size?: number;                // optional
  total?: number;               // optional
  onPageChange?: (page: number, size: number) => void;
  pagination?: boolean;         // toggle pagination
};

export default function DataTable<T extends { id: number }>({
  data,
  columns,
  loading = false,
  page = 1,
  size = 10,
  total,
  onPageChange,
  pagination = false,      
}: DataTableProps<T>) {
  return (
    <Table<T>
      rowKey="id"
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={
        pagination
          ? {
              current: page,
              pageSize: size,
              total,
              showSizeChanger: true,
              onChange: (p, s) => onPageChange?.(p, s),
            }
          : false
      }
    />
  );
}
