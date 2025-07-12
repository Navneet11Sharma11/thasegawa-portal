import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserDropdown from './UserDropdown';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
  // Debug environment variable here
  console.log('VITE_HEADER_COLOR:', import.meta.env.VITE_HEADER_COLOR);

  return (
    <AntHeader
      style={{
        backgroundColor: import.meta.env.VITE_HEADER_COLOR || '#1677FF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer', color: 'white' }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <UserDropdown />
    </AntHeader>
  );
};

export default Header;
