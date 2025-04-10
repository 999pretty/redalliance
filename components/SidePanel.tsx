import React from 'react';
import HeaderMobile from './header/HeaderMobile';
import Sidebar from './header/Sidebar';

const SidePanel = () => {
  return (
    <>
      <header className="header-area">
        <div className="header-inner">
          <HeaderMobile />
        </div>
      </header>

      <Sidebar />
    </>
  );
};

export default SidePanel;
