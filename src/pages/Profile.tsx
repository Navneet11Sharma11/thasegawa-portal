import React from 'react';
import { Card, Avatar } from 'antd';

const Profile = () => {
  const user = {
    name: 'Navneet Sharma',
    role: 'Employee',
    email: 'navneet@example.com',
    avatar: null, // or avatar URL
  };

  // Function to get initials from full name
  const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    const firstInitial = names[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  return (
    <Card title="User Profile" style={{ maxWidth: 400, margin: 'auto', marginTop: 24 }}>
      <Card.Meta
        avatar={
          user.avatar ? (
            <Avatar size={64} src={user.avatar} />
          ) : (
            <Avatar size={64}>{getInitials(user.name)}</Avatar>
          )
        }
        title={user.name}
        description={user.role}
      />
      <p style={{ marginTop: 16 }}>
        <strong>Email:</strong> {user.email}
      </p>
    </Card>
  );
};

export default Profile;
