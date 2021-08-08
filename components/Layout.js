import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Code Story</title>
      </Head>
      {children}
    </>
  );
}