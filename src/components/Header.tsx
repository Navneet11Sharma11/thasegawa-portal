import React from 'react';
import { Layout, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserDropdown from './UserDropdown';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
  const headerColor =
    (import.meta.env && import.meta.env.VITE_HEADER_COLOR
      ? import.meta.env.VITE_HEADER_COLOR
      : '#1677FF'
    ).toLowerCase().trim();

  // Decide tooltip text based on header color
  const tooltipText =
    headerColor === '#bc204b' ? 'Production Environment' : 'Test Environment' ;

  return (
    <AntHeader
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
          onClick={() => setCollapsed(!collapsed)}
          style={{ cursor: 'pointer', color: 'white', padding: '4px' }}
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Tooltip>

      <UserDropdown />
    </AntHeader>
  );
};

export default Header;
