import React from 'react';

const SidebarLogo = ({ collapsed }: { collapsed: boolean }) => (
  <div
    style={{
      height: 64,
      margin: 16,
      color: '#000',
      fontSize: 24,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <img
      src="/T-Hasegawa-Fav.png"
      alt="Logo"
      style={{ height: 32, marginRight: collapsed ? 0 : 8 }}
    />
    {!collapsed && 'Thasegawa'}
  </div>
);

export default SidebarLogo;
