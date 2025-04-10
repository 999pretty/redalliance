import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="error_page"
      style={{
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div
        className="hero"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src="/img/planetsbg.webp"
          alt="Space background"
          fill
          priority
          quality={75}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }}
        />
        <div
          className="content"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              margin: 0,
              marginBottom: '1rem',
              color: '#ffffff',
              opacity: 0.9,
            }}
          >
            404!
          </h1>
          <p
            style={{
              color: '#ffffff',
              fontSize: '1.2rem',
              margin: 0,
              marginBottom: '2rem',
              opacity: 0.8,
            }}
          >
            These are not the pages you&apos;ve been looking for.
          </p>

          <Link
            href="/"
            className="alliance_tm_button"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 24px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(0,0,0,0.2)',
              display: 'inline-block',
            }}
          >
            BACK HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
