import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

// Map specific paths to breadcrumb names
const breadcrumbNameMap: Record<string, string> = {
  '/': 'Home',
  '/metrics': 'Metrics',
  '/events': 'Events',
  '/applications': 'Applications',
  '/applications/app-links': 'App Links',
  '/applications/service-links': 'Service Links',
  '/microservices': 'MicroServices',
  // Add more paths and labels as needed
};

const DynamicBreadcrumb = () => {
  const location = useLocation();

  // Split the current path into parts for breadcrumb
  const pathSnippets = location.pathname.split('/').filter(Boolean);

  // Build breadcrumb items for each path segment
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url] || url}</Link>
      </Breadcrumb.Item>
    );
  });

  // Always start breadcrumb with Home
  const breadcrumbItems = [
    <Breadcrumb.Item key="home" icon={<HomeOutlined />}>
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <Breadcrumb style={{ margin: '16px 0 16px 24px' }}>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
