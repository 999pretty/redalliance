import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ScrollspyNav from 'react-scrollspy-nav';
import sidebarContent from '../../nav/sidebar';
import Image from 'next/image';

type SidebarFooterContent = {
  name: string;
  email: string;
  emailRef: string;
};

const LazyEmail = dynamic(() => import('./LazyEmail'));

const sidebarFooterContent: SidebarFooterContent = {
  name: 'Made by Oliver',
  email: 'oliverzaj@gmail.com',
  emailRef: 'mailto:oliverzaj@gmail.com',
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'Star Wars';
            font-style: normal;
            font-weight: 400;
            src: url('/fonts/starwars.woff') format('woff');
            font-display: swap;
          }
        `}
      </style>
      <div className="mob-header" role="banner">
        <button
          className="toggler-menu"
          onClick={handleClick}
          aria-label={click ? 'Close menu' : 'Open menu'}
          aria-expanded={click}
          aria-controls="sidebar-menu"
        >
          <div className={click ? 'active' : ''}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div
        className={click ? 'alliance_tm_sidebar menu-open' : 'alliance_tm_sidebar'}
        id="sidebar-menu"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar_inner">
          <button
            className="logo"
            onClick={scrollToTop}
            onKeyPress={(e) => handleKeyPress(e, scrollToTop)}
            style={{
              background: 'transparent',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              padding: '20px 0',
              marginTop: '28px',
              marginRight: '20px',
            }}
            aria-label="Scroll to top"
          >
            <div
              style={{
                fontSize: '20px',
                textAlign: 'center',
                letterSpacing: '3px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                WebkitTextStroke: '0.5px #ffe5e3',
                color: '#ffe5e3',
                textShadow: '0 0 1px #ffe5e3',
              }}
            >
              <span style={{ fontFamily: "'Star Wars'" }}>Alliance</span>
              <span
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: '7px', color: '#ffe5e3' }}
              >
                starwars DB
              </span>
            </div>
          </button>
          <nav className="menu" role="navigation">
            <ScrollspyNav
              scrollTargetIds={['home', 'characters']}
              activeNavClass="active"
              offset={0}
              scrollDuration="100"
            >
              <ul className="anchor_nav" role="menubar">
                {sidebarContent.map((val, i) => (
                  <li key={i} role="none">
                    <div className="list_inner">
                      <a
                        href={val.itemRoute}
                        className={val.activeClass}
                        onClick={handleClick}
                        role="menuitem"
                        aria-label={`Navigate to ${val.itemName}`}
                        onKeyPress={(e) => handleKeyPress(e, handleClick)}
                      >
                        <Image
                          className="svg custom"
                          src={`/img/svg/${val.icon}.svg`}
                          width={50}
                          height={50}
                          alt={`${val.itemName} icon`}
                        />
                        {val.itemName}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollspyNav>
          </nav>
          <LazyEmail sidebarFooterContent={sidebarFooterContent} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
