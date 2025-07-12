import React from 'react';
import { Layout, Space, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserDropdown from '../UserDropdown';
import ThemeToggle from '@/context/ThemeToggle';
import { HEADER_COLORS } from '@/config';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  user: { name: string; role: string; initials: string };
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, toggleCollapsed, user }) => {
  const headerColor = (import.meta.env.VITE_HEADER_COLOR || '#1677FF').toLowerCase().trim();

  const tooltipText = HEADER_COLORS[headerColor] || 'Unknown Environment';

  return (
    <Tooltip title={tooltipText} placement="bottom">
      <Header
        style={{
          backgroundColor: headerColor,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          cursor: 'default',
        }}
      >
        <div
          onClick={toggleCollapsed}
          style={{ cursor: 'pointer', color: 'white', padding: 4 }}
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <Space size="middle" align="center">
          <ThemeToggle />
          <UserDropdown />
        </Space>
      </Header>
    </Tooltip>
  );
};

export default AppHeader;
