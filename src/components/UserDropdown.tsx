import React from 'react';
import { Avatar, Dropdown, Menu, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Text } = Typography;

const UserDropdown: React.FC = () => {
  const navigate = useNavigate();

  const user = {
    name: 'Navneet Sharma',
    initials: 'NS',
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const menu = (
    <Menu onClick={({ key }) => key === 'logout' && handleLogout()}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">View Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <a
        onClick={(e) => e.preventDefault()}
        style={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
        }}
        aria-label="User menu"
      >
        <Avatar style={{ backgroundColor: '#1890ff' }}>{user.initials}</Avatar>
        <Text style={{ color: 'white', whiteSpace: 'nowrap' }}>{user.name}</Text>
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
