import React, { useState } from 'react';
import { Button, Input, Space, Table, Tooltip, Row, Col } from 'antd';
import { AppstoreOutlined, TableOutlined, ExportOutlined, SearchOutlined } from '@ant-design/icons';
import config from '../config';
import CardGrid, { CardItem } from '../components/common/CardGrid';
import { useTheme } from '../context/ThemeContext';

const Applications = () => {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const sortedSubsites = [...config.subsites.apps].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredSubsites = sortedSubsites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardItems: CardItem[] = filteredSubsites.map((site) => ({
    key: site.key,
    title: site.name,
    url: site.path,
    description: site.description,
    lastUpdated: site.lastUpdated,
    status: site.status,
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a href={record.path} target="_blank" rel="noopener noreferrer">
          {text} <ExportOutlined />
        </a>
      ),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'URL',
      dataIndex: 'path',
      key: 'path',
      render: (url: string) => <span style={{ fontSize: 12 }}>{url}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col flex="auto" style={{ maxWidth: 300 }}>
          <Input className={theme === 'dark' ? 'dark-input' : ''}
            placeholder="Search applications..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </Col>

        <Col>
          <Space>
            <Tooltip title="Card grid">
              <Button
                type={viewMode === 'card' ? 'primary' : 'default'}
                shape="circle"
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('card')}
              />
            </Tooltip>

            <Tooltip title="Table list">
              <Button
                type={viewMode === 'table' ? 'primary' : 'default'}
                shape="circle"
                icon={<TableOutlined />}
                onClick={() => setViewMode('table')}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      {viewMode === 'card' ? (
        <CardGrid items={cardItems} />
      ) : (
        <Table className={theme === 'dark' ? 'dark-table' : ''}
          dataSource={filteredSubsites}
          columns={columns}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default Applications;
