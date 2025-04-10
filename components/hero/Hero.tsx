import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className="rebel-logo-container">
        <div className="logo-wrapper">
          <Image
            src="/Rebel_Alliance_logo.svg"
            alt="Rebel Alliance Logo"
            fill
            priority
            sizes="120px"
            style={{
              filter: 'brightness(0) invert(1)',
              opacity: 0.9,
            }}
          />
        </div>
      </div>
      <p className="hero-quote">&quot;For the Rebellion.&quot;</p>

      <style jsx>{`
        .rebel-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 40px 0;
        }

        .logo-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          animation: pulsate 4.5s ease-in-out infinite alternate;
          will-change: transform, filter;
        }

        .hero-quote {
          font-family: 'Orbitron', 'Rajdhani', 'Audiowide', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.2em;
          text-align: center;
          margin: 20px 0;
          font-weight: 500;
          text-transform: uppercase;
          color: white;
        }

        @keyframes pulsate {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.6));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.6));
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
