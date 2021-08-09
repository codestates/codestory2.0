import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Code Story</title>
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0"></meta>
      </Head>
      {children}
    </>
  );
}