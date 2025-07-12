import React from 'react';
import { Card, Col, Row, Tooltip } from 'antd';
import { ExportOutlined, CopyOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

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
              padding: 12,
              cursor: 'pointer',
            }}
          >
            {/* Title - top left */}
            <Tooltip title={item.description}>
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  right: 48, // leave space so it doesn't overlap copy icon
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: theme === 'dark' ? '#eee' : '#111',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: 'default',
                }}
              >
                {item.title}
              </div>
            </Tooltip>

            {/* Copy icon - top right */}
            <Tooltip title="Copy URL">
              <CopyOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(item.url);
                }}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontSize: 16,
                  color: theme === 'dark' ? '#ccc' : '#888',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              />
            </Tooltip>

            {/* External link - bottom right */}
            <Tooltip title="Open in new tab">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  fontSize: 16,
                  color: theme === 'dark' ? '#ccc' : '#888',
                  zIndex: 10,
                }}
              >
                <ExportOutlined />
              </a>
            </Tooltip>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
