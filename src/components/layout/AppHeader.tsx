import React from 'react';
import { Layout, Space, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserDropdown from '../UserDropdown';
import ThemeToggle from '@/context/ThemeToggle';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  user: { name: string; role: string; initials: string };
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, toggleCollapsed, user }) => {
  const headerColor = (import.meta.env.VITE_HEADER_COLOR || '#1677FF').toLowerCase().trim();

  const tooltipText = headerColor === '#bc204b' ? 'Production Environment' : 'Test Environment';

  console.log('headerColor:', headerColor);
  console.log('tooltipText:', tooltipText);

  return (
    <Header
      style={{
        backgroundColor: headerColor,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      <Tooltip title={tooltipText}>
        <div
          onClick={toggleCollapsed}
          style={{ cursor: 'pointer', color: 'white', padding: 4 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Tooltip>

      <Space size="middle" align="center">
        <ThemeToggle />
        <UserDropdown />
      </Space>
    </Header>
  );
};

export default AppHeader;
