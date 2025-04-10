import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '../../hero/Hero';
import Image from 'next/image';

const SidePanel = dynamic(() => import('../../SidePanel'), {
  ssr: false,
});

const Section = dynamic(() => import('../../characters/Section'), {
  ssr: false,
});

const allianceHomeSidebar = () => {
  return (
    <div className="alliance_tm_mainpart theme-dark">
      <div style={{ position: 'fixed', width: '100%', height: '100vh', zIndex: 0 }}>
        <Image
          src="/img/planetsbg.webp"
          alt="Space background"
          fill
          priority
          quality={75}
          style={{
            objectFit: 'cover',
            objectPosition: '25% center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.9) 0%,
              rgba(0, 0, 0, 0.7) 15%,
              rgba(0, 0, 0, 0.4) 25%,
              rgba(0, 0, 0, 0.4) 40%,
              rgba(0, 0, 0, 0.3) 50%,
              rgba(0, 0, 0, 0.2) 60%,
              rgba(0, 0, 0, 0.4) 75%,
              rgba(0, 0, 0, 0.8) 90%
            )`,
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          backgroundColor: 'transparent',
        }}
      >
        <div className="alliance_tm_hero" id="home">
          <div className="content">
            <Hero />
          </div>
        </div>
        <SidePanel />
        <Section />
      </div>
    </div>
  );
};

export default allianceHomeSidebar;
