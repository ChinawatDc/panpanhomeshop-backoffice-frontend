'use client';

import { Table } from 'antd';

type DataTableProps<T> = {
  data: T[];
  columns: any[];
  loading: boolean;
  page: number;
  size: number;
  total: number;
  onPageChange: (page: number, size: number) => void;
};

export default function DataTable<T extends { id: number }>({
  data,
  columns,
  loading,
  page,
  size,
  total,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <Table<T>
      rowKey='id'
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={{
        current: page,
        pageSize: size,
        total,
        showSizeChanger: true,
        onChange: onPageChange,
      }}
    />
  );
}
