// components/AppHeader.tsx
import React from 'react';
import { Layout, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserDropdown from '../UserDropdown';
import ThemeToggle from '@/context/ThemeToggle';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  user: { name: string; role: string; initials: string };
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, toggleCollapsed, user }) => (
  <Header
    style={{
      backgroundColor: import.meta.env.VITE_HEADER_COLOR || '#1677FF',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
    }}
  >
    {/* Collapse toggle icon */}
    <div onClick={toggleCollapsed} style={{ cursor: 'pointer', color: 'white' }}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>

    {/* Right-side: Theme toggle + User menu */}
    <Space size="middle" align="center">
      <ThemeToggle /> {/* ✅ Add theme toggle here */}
      <UserDropdown user={user} />
    </Space>
  </Header>
);

export default AppHeader;
