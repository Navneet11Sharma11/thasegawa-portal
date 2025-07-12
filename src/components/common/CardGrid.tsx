import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title } = Typography;

export interface CardItem {
  key: string;
  title: string;
  description?: string;
  url: string;
}

interface CardGridProps {
  items: CardItem[];
}

const CardGrid: React.FC<CardGridProps> = ({ items }) => {
  const { theme } = useTheme();
  return (
    <Row gutter={[24, 24]}>
      {items.map((item) => (
        <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
          <Card
            className={theme === 'dark' ? 'dark-card' : ''}
            hoverable
            onClick={() => window.open(item.url, '_blank')}
            style={{
              cursor: 'pointer',
              height: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 5,
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={item.title}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </span>
              <ExportOutlined />
            </div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 8 }} title={item.description}>
              {item.url}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
