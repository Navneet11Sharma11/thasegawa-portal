import React from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import DynamicBreadcrumb from '../DynamicBreadcrumb';
import SidebarMenu from './SidebarMenu';
import SidebarLogo from './SidebarLogo';
import { useTheme } from '../../context/ThemeContext';

const { Sider, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { theme } = useTheme();

  const user = {
    name: 'Navneet Sharma',
    role: 'Employee',
    initials: 'NS',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme={theme === 'dark' ? 'dark' : 'light'}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: '#f5f5f5',
          color: '#000',
          borderRight: '1px solid #e5e5e5', // Optional border between sidebar and content
        }}
        width={240} // can adjust width here
      >
        <SidebarLogo collapsed={collapsed} />
        <SidebarMenu />
      </Sider>

      <Layout style={{ background: '#fff', paddingLeft: 16 }}> {/* <-- This adds space between Sider and Content */}
        <AppHeader
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed(!collapsed)}
          user={user}
        />
        <DynamicBreadcrumb />

        <Content style={{
          margin: '0 16px 16px', padding: '16px', minHeight: 280, background: 'var(--bg-color)', // ✅ dynamic color
          color: 'var(--text-color)',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
