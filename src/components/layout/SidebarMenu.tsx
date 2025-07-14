import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const { SubMenu } = Menu;

const pathToKey: Record<string, string> = {
  '/applications': '/applications/app-links',
  '/applications/app-links': '/applications/app-links',
  '/applications/service-links': '/applications/service-links',
  '/monitoring': '/monitoring',
  '/events': '/events',
  '/logging': '/logging',
};

const getOpenKeys = (key: string) => (key.startsWith('/applications') ? ['applications'] : []);

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const selectedKey = pathToKey[pathname] || '';
  const [openKeys, setOpenKeys] = useState<string[]>(getOpenKeys(selectedKey));

  useEffect(() => {
    setOpenKeys(getOpenKeys(selectedKey));
  }, [selectedKey]);

  const onOpenChange = (keys: string[]) => setOpenKeys(keys);

  return (
    <Menu
      mode="inline"
      theme={theme === 'dark' ? 'dark' : 'light'}
      selectedKeys={selectedKey ? [selectedKey] : []}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={({ key }) => navigate(key)}
      style={{ height: '100%', borderRight: 0 }}
    >
      <SubMenu key="applications" icon={<DashboardOutlined />} title="Applications">
        <Menu.Item key="/applications/app-links">App Links</Menu.Item>
        <Menu.Item key="/applications/service-links">Service Links</Menu.Item>
      </SubMenu>
      <Menu.Item key="/monitoring" icon={<InfoCircleOutlined />}>
        Monitoring
      </Menu.Item>
      <Menu.Item key="/logging" icon={<FileTextOutlined />}>
        Logs
      </Menu.Item>
      <Menu.Item key="/events" icon={<CalendarOutlined />}>
        Events
      </Menu.Item>
    </Menu>
  );
};

export default SidebarMenu;
