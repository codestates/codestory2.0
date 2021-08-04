import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Code Story</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      </Head>
      {children}
    </>
  )
}