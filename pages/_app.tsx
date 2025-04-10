import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import '../styles/index.scss';

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & {
    setShowCursor?: (show: boolean) => void;
    setIsModalOpen?: (open: boolean) => void;
  };
}

type MixBlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
  loading: () => null,
});

const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), {
  ssr: false,
  loading: () => null,
});

export default function MyApp({ Component, pageProps }: CustomAppProps): ReactNode {
  const [showCursor, setShowCursor] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const initAOS = async () => {
      try {
        const AOS = (await import('aos')).default;
        await import('aos/dist/aos.css');
        AOS.init({
          once: true,
          disable: 'mobile',
        });
      } catch (error) {
        console.error('Failed to initialize AOS:', error);
      }
    };

    initAOS();
  }, []);

  const regularCursor = {
    innerSize: 8,
    outerSize: 35,
    color: '153,153,255',
    outerAlpha: 0.2,
    innerScale: 0.6,
    outerScale: 1.2,
    trailingSpeed: 8,
    clickables: [
      'a',
      'button',
      '.link',
      'input[type="text"]',
      'input[type="email"]',
      'input[type="number"]',
      'input[type="submit"]',
      'input[type="image"]',
      'label[for]',
      'select',
      'textarea',
      'button',
      '.link',
    ],
    hasBlendMode: false,
    outerStyle: {
      mixBlendMode: 'exclusion' as MixBlendMode,
    },
    innerStyle: {
      mixBlendMode: 'exclusion' as MixBlendMode,
    },
  };

  const modalCursor = {
    innerSize: 8,
    outerSize: 20,
    color: '153,153,255',
    outerAlpha: 0.15,
    innerScale: 0.5,
    outerScale: 0,
    trailingSpeed: 10,
    clickables: ['button', '.close-modal'],
    hasBlendMode: false,
    outerStyle: {
      mixBlendMode: 'normal' as MixBlendMode,
    },
    innerStyle: {
      mixBlendMode: 'normal' as MixBlendMode,
    },
  };

  return (
    <div className="wrapper">
      <Head>
        <title key="title">Alliance</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link key="planetsbg" rel="preload" href="/img/planetsbg.webp" as="image" />
        <link key="alliance-logo" rel="preload" href="/Rebel_Alliance_logo.svg" as="image" />
      </Head>
      {showCursor && <AnimatedCursor {...(isModalOpen ? modalCursor : regularCursor)} />}
      <main className={poppins.className}>
        <Component {...pageProps} setShowCursor={setShowCursor} setIsModalOpen={setIsModalOpen} />
      </main>

      <ToastContainer />

      <ScrollToTop />
    </div>
  );
}
