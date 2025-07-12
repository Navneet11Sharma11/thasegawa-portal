import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './SidebarLogo.scss';

interface SidebarLogoProps {
  collapsed: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`sidebar-logo ${isDark ? 'dark' : 'light'}`}
    >
      <img
        src="/T-Hasegawa-Fav.png"
        alt="Logo"
        className="logo-image"
        style={{ marginRight: collapsed ? 0 : 8 }}
      />
      {!collapsed && 'Thasegawa'}
    </div>
  );
};

export default SidebarLogo;
