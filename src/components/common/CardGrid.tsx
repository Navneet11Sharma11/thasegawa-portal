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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const handleCopy = (url: string, key: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
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

  const textColor = isDark ? '#eee' : '#111';
  const iconColor = isDark ? '#ccc' : '#888';

  return (
    <Row gutter={[24, 24]}>
      {items.map((item) => (
        <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
          <Card
            className={`app-card ${isDark ? 'dark-card' : ''}`}
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
            {/* Title + status */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                right: 48,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                overflow: 'hidden',
              }}
            >
              <Tooltip title={item.description}>
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: textColor,
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

            {/* Last updated */}
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

            {/* Copy URL */}
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
                  color: iconColor,
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              />
            </Tooltip>

            {/* External link */}
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
                  color: iconColor,
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
