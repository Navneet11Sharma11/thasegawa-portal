import { Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import config from '../config';

const Navbar = () => {
  const location = useLocation();

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
      {/* Applications */}
      <Menu.SubMenu key="apps" title="Applications" icon={<AppstoreOutlined />}>
        {config.subsites.map((site) => (
          <Menu.Item key={site.key}>
            <a href={site.path} target="_blank" rel="noopener noreferrer">
              {site.name}
            </a>
          </Menu.Item>
        ))}
      </Menu.SubMenu>

      {/* Metrics */}
      <Menu.SubMenu key="metrics" title="Metrics" icon={<BarChartOutlined />}>
        <Menu.Item key="/metrics/system">
          <Link to="/metrics/system">System Metrics</Link>
        </Menu.Item>
        <Menu.Item key="/metrics/user">
          <Link to="/metrics/user">User Metrics</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Microservices */}
      <Menu.SubMenu key="microservices" title="Microservices" icon={<ClusterOutlined />}>
        {config.microservices.map((service) => (
          <Menu.Item key={service.key}>
            <a href={service.path} target="_blank" rel="noopener noreferrer">
              {service.name}
            </a>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );
};

export default Navbar;
