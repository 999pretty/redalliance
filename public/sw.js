if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + '.js', a).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let t = {};
    const f = (e) => i(e, c),
      r = { module: { uri: c }, exports: t, require: f };
    s[c] = Promise.all(a.map((e) => r[e] || f(e))).then((e) => (n(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/Rebel_Alliance_logo.svg', revision: 'a977e148d481d710f519f42a3e8fac22' },
        { url: '/_next/static/chunks/108.7068d27d0a4e5489.js', revision: '7068d27d0a4e5489' },
        { url: '/_next/static/chunks/259.f5935ff8675cb075.js', revision: 'f5935ff8675cb075' },
        { url: '/_next/static/chunks/371.f91412ebb548e305.js', revision: 'f91412ebb548e305' },
        { url: '/_next/static/chunks/55.23e799f4fcd22f28.js', revision: '23e799f4fcd22f28' },
        { url: '/_next/static/chunks/588.66940807bce1c7b9.js', revision: '66940807bce1c7b9' },
        { url: '/_next/static/chunks/664-806b52bf69b97e98.js', revision: '806b52bf69b97e98' },
        { url: '/_next/static/chunks/675-3cd3557301456094.js', revision: '3cd3557301456094' },
        { url: '/_next/static/chunks/711.cd8264bd6c0f7121.js', revision: 'cd8264bd6c0f7121' },
        { url: '/_next/static/chunks/889.83414ebd830ec7ee.js', revision: '83414ebd830ec7ee' },
        { url: '/_next/static/chunks/939.340d8cee19f3b5f9.js', revision: '340d8cee19f3b5f9' },
        { url: '/_next/static/chunks/969.b7f7ff12665b66d8.js', revision: 'b7f7ff12665b66d8' },
        { url: '/_next/static/chunks/framework-2c16ac744b6cdea6.js', revision: '2c16ac744b6cdea6' },
        { url: '/_next/static/chunks/main-58fef9cbb954efe4.js', revision: '58fef9cbb954efe4' },
        { url: '/_next/static/chunks/pages/404-4252f091e191632b.js', revision: '4252f091e191632b' },
        {
          url: '/_next/static/chunks/pages/_app-db45efddf0874e23.js',
          revision: 'db45efddf0874e23',
        },
        {
          url: '/_next/static/chunks/pages/_error-77823ddac6993d35.js',
          revision: '77823ddac6993d35',
        },
        {
          url: '/_next/static/chunks/pages/index-101660570f8bc4da.js',
          revision: '101660570f8bc4da',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        { url: '/_next/static/chunks/webpack-6f58670910f530b9.js', revision: '6f58670910f530b9' },
        { url: '/_next/static/css/0a4ec652d6028205.css', revision: '0a4ec652d6028205' },
        { url: '/_next/static/css/740bc3807dbc113a.css', revision: '740bc3807dbc113a' },
        {
          url: '/_next/static/jlKiSOGe5s4SefOOy61ii/_buildManifest.js',
          revision: '30aa2e8737a1f8d4c7f40dcc32077d92',
        },
        {
          url: '/_next/static/jlKiSOGe5s4SefOOy61ii/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/0484562807a97172-s.p.woff2',
          revision: 'b550bca8934bd86812d1f5e28c9cc1de',
        },
        {
          url: '/_next/static/media/8888a3826f4a3af4-s.p.woff2',
          revision: '792477d09826b11d1e5a611162c9797a',
        },
        {
          url: '/_next/static/media/c3bc380753a8436c-s.woff2',
          revision: '5a1b7c983a9dc0a87a2ff138e07ae822',
        },
        {
          url: '/_next/static/media/eafabf029ad39a43-s.p.woff2',
          revision: '43751174b6b810eb169101a20d8c26f8',
        },
        {
          url: '/_next/static/media/f10b8e9d91f3edcb-s.woff2',
          revision: '63af7d5e18e585fad8d0220e5d551da1',
        },
        {
          url: '/_next/static/media/fe0777f1195381cb-s.woff2',
          revision: 'f2a04185547c36abfa589651236a9849',
        },
        { url: '/android-chrome-192x192.png', revision: '4e591288eaf7615f479854e04d4abbf7' },
        { url: '/android-chrome-512x512.png', revision: '4666dcea0fb9827e21d890f9c095430b' },
        { url: '/apple-touch-icon.png', revision: 'e341e51f76397c1a53ea9b5e83dca59c' },
        { url: '/arrow.svg', revision: 'f3de1d4cbd40edc55afde161004f95c9' },
        { url: '/browserconfig.xml', revision: 'a493ba0aa0b8ec8068d786d7248bb92c' },
        { url: '/favicon-16x16.png', revision: '922e96c6a1d52f6b35bc90b07ae8bbef' },
        { url: '/favicon-32x32.png', revision: '3f031b6106a3a935f89b4a4b233cdb13' },
        { url: '/favicon.ico', revision: '8587acb8e75b498efa8d0201b251f397' },
        { url: '/img/planetsbg.webp', revision: 'f9c1f5fe5502357a6ff91d123f483dd1' },
        { url: '/img/svg/cancel.svg', revision: 'dd2c43a1f08c73396294905edf1f351f' },
        { url: '/img/svg/envelope11.svg', revision: '0ff9443d6336c55e33addba5785fa181' },
        { url: '/img/svg/home.svg', revision: '0bfa705faabcc4942b7638466f35afca' },
        { url: '/img/svg/human.svg', revision: '2599a21e969b4e73a9e8bc0ee62d424f' },
        { url: '/img/thumbs/1-1.jpg', revision: '55a8bfe07b83ed4d0648ef12190e5a19' },
        { url: '/img/thumbs/26-35.jpg', revision: 'b65c10f040b0123443cdae8250d956e1' },
        { url: '/img/thumbs/3-4.jpg', revision: '5d5411cf8d575f357ea11f55a3375f64' },
        { url: '/img/thumbs/4-2.jpg', revision: '4c7513a88730a63a3eca007812e01bce' },
        { url: '/img/thumbs/4-3.jpg', revision: '1e4f1e646f3476cfe4ede54741180e9a' },
        { url: '/manifest.json', revision: 'c8c8ecacdf80f94fb8fe7f4b2151fe4f' },
        { url: '/scss/main/_style.scss', revision: '11bdc42b647dc6586e2e6596be7d67a8' },
        { url: '/scss/style.scss', revision: '6260e264f318947419b95f375481f544' },
        { url: '/site.webmanifest', revision: '053100cb84a50d2ae7f5492f7dd7f25e' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: i, state: a }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
