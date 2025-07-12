import React from 'react';
import { Tooltip } from 'antd';
import { BulbOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
      <span
        style={{ fontSize: 18, cursor: 'pointer' }}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <BulbOutlined /> : <MoonOutlined />}
      </span>
    </Tooltip>
  );
};

export default ThemeToggle;
