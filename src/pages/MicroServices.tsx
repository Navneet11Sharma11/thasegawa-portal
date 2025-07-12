import React, { useState, useMemo } from 'react';
import { Button, Table, Space, Input, Row, Col, Tooltip } from 'antd';
import { AppstoreOutlined, TableOutlined, ExportOutlined, SearchOutlined } from '@ant-design/icons';
import config from '../config';
import CardGrid, { CardItem } from '../components/common/CardGrid';
import { useTheme } from '../context/ThemeContext';

const MicroService = () => {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const sortedMicroservices = useMemo(
    () =>
      [...config.microservices].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    []
  );

  const filteredMicroservices = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return sortedMicroservices.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.description?.toLowerCase().includes(lowerSearch) ||
        item.path.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, sortedMicroservices]);

  const cardItems: CardItem[] = filteredMicroservices.map((svc) => ({
    key: svc.key,
    title: svc.name,
    description: svc.description,
    url: svc.path,
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
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col flex="auto" style={{ maxWidth: 300 }}>
          <Input className={theme === 'dark' ? 'dark-input' : ''}
            placeholder="Search microservices..."
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
          dataSource={filteredMicroservices}
          columns={columns}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default MicroService;
