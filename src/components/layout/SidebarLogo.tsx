import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import './SidebarLogo.scss';

interface SidebarLogoProps {
  collapsed: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Link to="/" className={`sidebar-logo ${isDark ? 'dark' : 'light'}`} style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/T-Hasegawa-Fav.png"
        alt="Logo"
        className="logo-image"
        style={{ marginRight: collapsed ? 0 : 8 }}
      />
     {!collapsed && <span style={{ color: '#BC204B', fontSize: '0.85rem' }}>T. HASEGAWA USA INC.</span>}
    </Link>
  );
};

export default SidebarLogo;
