import React, { useState } from 'react';
import { Card, Col, Row, Tooltip } from 'antd';
import { ExportOutlined, CopyOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { formatStatus, getStatusColor, StatusType } from '@/config';

export interface CardItem {
  key: string;
  title: string;
  description?: string;
  url: string;
  lastUpdated?: string;
  status: StatusType;
}

interface CardGridProps {
  items: CardItem[];
}

const CardGrid: React.FC<CardGridProps> = ({ items }) => {
  const { theme } = useTheme();

  // Track which card's URL was copied
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (url: string, key: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000); // reset tooltip after 2 seconds
    });
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
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
            {/* Title with status dot - top left */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                right: 48, // space for copy icon
                display: 'flex',
                alignItems: 'center',
                gap: 8, // space between title and dot
                overflow: 'hidden',
              }}
            >
              <Tooltip title={item.description}>
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: theme === 'dark' ? '#eee' : '#111',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 200,
                  }}
                >
                  {item.title}
                </div>
              </Tooltip>

              {item.status && (
                <Tooltip title={`Status: ${formatStatus(item.status)}`}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(item.status),
                      flexShrink: 0,
                    }}
                  />
                </Tooltip>
              )}
            </div>

            {/* Last updated - bottom left */}
            <Tooltip title="Last updated date">
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  fontSize: 11,
                  color: '#999',
                  whiteSpace: 'nowrap',
                }}
              >
                Last updated: {formatDate(item.lastUpdated)}
              </div>
            </Tooltip>

            {/* Copy icon - top right */}
            <Tooltip title={copiedKey === item.key ? 'Copied URL' : 'Copy URL'}>
              <CopyOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(item.url, item.key);
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
