import React, { useState, useEffect } from 'react';
import { Card, Table, Select, DatePicker, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';

import { AppOptions, DummyLogs } from '@/config';
import { ErrorLog } from '@/interfaces/ErrorLog';

// Extend dayjs with plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

const { RangePicker } = DatePicker;

const ErrorLogs: React.FC = () => {
  // Multi-select apps filter
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  // Date range filter, using dayjs objects or null
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  // Filtered logs
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  // Pagination state
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20'],
    total: DummyLogs.length,
  });

  // Filter logs whenever filters change
  useEffect(() => {
    const filtered = DummyLogs.filter(log => {
      // Check if log appKey matches one of selectedApps (or no filter)
      const matchesApp = selectedApps.length === 0 || selectedApps.includes(log.appKey);

      // Convert log timestamp to dayjs in UTC and start of day
      const logDate = dayjs.utc(log.timestamp).startOf('day');

      // Get start and end date from dateRange, also start of day UTC
      const startDate = dateRange ? dateRange[0].utc().startOf('day') : null;
      const endDate = dateRange ? dateRange[1].utc().startOf('day') : null;

      // Check if logDate is in date range or if no date range selected
      const matchesDate =
        !dateRange ||
        (logDate.isSameOrAfter(startDate!) && logDate.isSameOrBefore(endDate!));

      return matchesApp && matchesDate;
    });

    setLogs(filtered);

    // Reset to first page and update total count
    setPagination(prev => ({
      ...prev,
      current: 1,
      total: filtered.length,
    }));
  }, [selectedApps, dateRange]);

  // Handle table pagination changes (page number, page size)
  const handleTableChange = (paginationConfig: TablePaginationConfig) => {
    setPagination(paginationConfig);
  };

  // Slice logs for current page
  const paginatedLogs = logs.slice(
    ((pagination.current ?? 1) - 1) * (pagination.pageSize ?? 5),
    (pagination.current ?? 1) * (pagination.pageSize ?? 5),
  );

  // Table columns
  const columns: ColumnsType<ErrorLog> = [
    {
      title: 'Application',
      dataIndex: 'appKey',
      key: 'appKey',
      render: key => AppOptions.find(app => app.key === key)?.label || key,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: t => dayjs(t).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const color = level === 'error' ? 'orange' : level === 'warn' ? 'gold' : 'red';
        return <Tag color={color}>{level.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Select
          mode="multiple"
          placeholder="Filter by Application"
          style={{ width: 300 }}
          allowClear
          onChange={(values: string[]) => setSelectedApps(values)}
          value={selectedApps}
        >
          {AppOptions.map(app => (
            <Select.Option key={app.key} value={app.key}>
              {app.label}
            </Select.Option>
          ))}
        </Select>

        <RangePicker
          value={dateRange || undefined}
          onChange={(dates) => {
            console.log('DatePicker onChange called. Dates:', dates);
            if (dates && dates.length === 2 && dates[0] && dates[1]) {
              setDateRange([dates[0], dates[1]]);
            } else {
              setDateRange(null);
            }
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={paginatedLogs}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default ErrorLogs;
