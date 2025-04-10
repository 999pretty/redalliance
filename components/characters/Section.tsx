import React from 'react';
import dynamic from 'next/dynamic';
import { poppins } from '@/app/fonts';

const Characters = dynamic(() => import('./Characters'), {
  loading: () => (
    <div
      className="loading-placeholder"
      style={{
        minHeight: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="loading-text"
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.2rem',
        }}
      >
        Loading Characters...
      </div>
    </div>
  ),
});

export default function Section() {
  return (
    <div>
      <div className="alliance_tm_characters" id="characters">
        <div className="container">
          <div className="alliance_tm_title">
            <h2 className={poppins.className}>Star Wars Characters</h2>
            <p>Explore the galaxy and its most memorable characters from the Star Wars universe.</p>
          </div>
          <Characters />
        </div>
      </div>
    </div>
  );
}
