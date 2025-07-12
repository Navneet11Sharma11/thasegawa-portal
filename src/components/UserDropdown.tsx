import React from 'react';
import { Avatar, Dropdown, Menu, Typography } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const UserDropdown = () => {
  const navigate = useNavigate();

  const user = {
    name: 'Navneet Sharma',
    initials: 'NS',
  };

  const handleLogout = () => {
    // Clear session storage or auth tokens
    localStorage.removeItem('token');
    // Redirect to login
    navigate('/login', { replace: true });
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Edit Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
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
      >
        <Avatar style={{ backgroundColor: '#1890ff' }}>{user.initials}</Avatar>
        <Text style={{ color: 'white', whiteSpace: 'nowrap' }}>{user.name}</Text>
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
