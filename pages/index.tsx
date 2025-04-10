import Head from 'next/head';
import HomeSidebar from '../components/pages/home-sidebar';

const index = () => {
  return (
    <>
      <Head>
        <title>Alliance</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <HomeSidebar />
    </>
  );
};

export default index;
