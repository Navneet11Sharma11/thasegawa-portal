import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const { SubMenu } = Menu;

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  // Map route paths to menu item keys
  const pathToKey = {
    '/applications': '/applications/app-links',  // redirect default to app-links
    '/applications/app-links': '/applications/app-links',
    '/applications/service-links': '/applications/service-links',
    '/metrics': '/metrics',
    '/events': '/events',
  };

  // Get selected key from current path
  const selectedKey = pathToKey[location.pathname] || '';

  // Determine open submenu keys based on selected key
  const getOpenKeys = (key: string) => {
    if (key.startsWith('/applications')) return ['applications'];
    return [];
  };

  const [openKeys, setOpenKeys] = useState<string[]>(getOpenKeys(selectedKey));

  // Update openKeys when location changes
  useEffect(() => {
    setOpenKeys(getOpenKeys(selectedKey));
  }, [selectedKey]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      mode="inline"
      theme={theme === 'dark' ? 'dark' : 'light'}
      selectedKeys={[selectedKey]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={({ key }) => navigate(key)}
      style={{ height: '100%', borderRight: 0 }}
    >
      <SubMenu key="applications" icon={<DashboardOutlined />} title="Applications">
        <Menu.Item key="/applications/app-links">App Links</Menu.Item>
        <Menu.Item key="/applications/service-links">Service Links</Menu.Item>
      </SubMenu>

      <Menu.Item key="/metrics" icon={<InfoCircleOutlined />}>
        Monitoring
      </Menu.Item>

      <Menu.Item key="/events" icon={<CalendarOutlined />}>
        Events
      </Menu.Item>
    </Menu>
  );
};

export default SidebarMenu;
