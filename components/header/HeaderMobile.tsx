import Link from 'next/link';
import { FC } from 'react';

const HeaderMobile: FC = () => {
  return (
    <>
      <div className="logo">
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            className="logo"
            style={{
              fontFamily: "'Star Wars'",
              fontSize: '20px',
              textAlign: 'center',
              letterSpacing: '3px',
              cursor: 'pointer',
              padding: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              WebkitTextStroke: '0.5px #ffe5e3',
              marginRight: '20px',
              color: '#ffffff',
            }}
          >
            <span style={{ color: '#ffffff' }}>Alliance</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HeaderMobile;
