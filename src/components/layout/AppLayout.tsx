import React, { useState, ReactNode } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import DynamicBreadcrumb from '../DynamicBreadcrumb';
import SidebarMenu from './SidebarMenu';
import SidebarLogo from './SidebarLogo';
import { useTheme } from '../../context/ThemeContext';

const { Sider, Content } = Layout;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const antTheme: 'light' | 'dark' = isDark ? 'dark' : 'light';

  const user = {
    name: 'Navneet Sharma',
    role: 'Employee',
    initials: 'NS',
  };

  return (
    <Layout className={antTheme} style={{ minHeight: '100vh' }}>
      <Sider
        theme={antTheme}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ borderRight: '1px solid #e5e5e5' }}
        width={240}
      >
        <SidebarLogo collapsed={collapsed} />
        <SidebarMenu />
      </Sider>

      <Layout className={antTheme}>
        <AppHeader
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed(!collapsed)}
          user={user}
        />
        <DynamicBreadcrumb />

        <Content
          className={antTheme}
          style={{
            margin: '0 16px 16px',
            padding: 16,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
