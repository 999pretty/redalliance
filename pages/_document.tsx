import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';
import type { ReactElement } from 'react';

export default function Document(): ReactElement<DocumentProps> {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content="star wars characters, star wars database, star wars wiki, star wars encyclopedia, jedi database, sith database, star wars species, star wars planets, star wars character profiles, galactic database, star wars character search, star wars character information, star wars character guide"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Alliance | Starwars DB" />
        <meta name="theme-color" content="#1A1C26" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/fonts/fonts.css" />

        <style>{`
          body {
            margin: 0;
            padding: 0;
            background-color: #111319;
            color: white;
          }
          .wrapper {
            min-height: 100vh;
            position: relative;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
