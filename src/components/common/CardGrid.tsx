import React from 'react';
import { Card, Col, Row, Typography, Tooltip } from 'antd';
import { ExportOutlined, CopyOutlined } from '@ant-design/icons';
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

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Row gutter={[24, 24]}>
      {items.map((item) => (
        <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
          <Card
            className={`app-card ${theme === 'dark' ? 'dark-card' : ''}`}
            hoverable
            style={{
              position: 'relative',
              height: 140,
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 12,
              cursor: 'pointer',
            }}
          >
            {/* Top Right Copy Icon */}
            <Tooltip title="Copy URL">
              <CopyOutlined
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleCopy(item.url);
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 12,
                  fontSize: 16,
                  color: theme === 'dark' ? '#ccc' : '#888',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>

            {/* Title */}
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={item.title}
            >
              {item.title}
            </div>

            {/* URL */}
            <Tooltip title="Open App">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(item.url);
                }}
                style={{
                  fontSize: 13,
                  color: theme === 'dark' ? '#bbb' : '#555',
                  wordBreak: 'break-word',
                  marginTop: 4,
                  paddingRight: 20,
                  cursor: 'pointer',
                }}
              >
                {item.url}
              </div>
            </Tooltip>

            {/* Bottom Right External Link */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // prevent card click
              style={{
                position: 'absolute',
                bottom: 10,
                right: 12,
                fontSize: 16,
                color: theme === 'dark' ? '#ccc' : '#888',
              }}
            >
              <ExportOutlined />
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
