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
  '/profile': 'Profile',
  // Add more paths and labels as needed
};

const DynamicBreadcrumb = () => {
  const { pathname } = useLocation();

  const pathSnippets = pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <HomeOutlined style={{ marginRight: 4 }} />
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url] || url}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  return <Breadcrumb style={{ margin: '16px 0 16px 24px' }}>{breadcrumbItems}</Breadcrumb>;
};

export default DynamicBreadcrumb;
