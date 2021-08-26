import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <meta name="description" content="CodeStory는 소프트웨어 엔지니어가 알아야 하는 리눅스, 오토마타 이론, CSS 등을 위한 학습용 게임을 제공합니다." />
          <meta name="keywords" content="코딩, coding, 게임, game, 교육, education, 학습, 개발, 개발자, developer, 리눅스, linux, css, 오토마톤, automaton, 오토마타, automata" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Code Story" />
          <meta property="og:description" content="CodeStory는 소프트웨어 엔지니어가 알아야 하는 리눅스, 오토마타 이론, CSS 등을 위한 학습용 게임을 제공합니다." />
          <meta property="og:image" content="https://ac.codestory.academy/login_slider1.png" />
          <meta property="og:url" content="https://ac.codestory.academy" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:title" content />
          <meta property="twitter:description" content="CodeStory는 소프트웨어 엔지니어가 알아야 하는 리눅스, 오토마타 이론, CSS 등을 위한 학습용 게임을 제공합니다." />
          <meta property="twitter:image" content="https://ac.codestory.academy/login_slider1.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

