import '../styles/main.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { useEffect, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import * as ga from '../lib/ga';
// import { Amplify, withSSRContext } from 'aws-amplify'; //배포 시 활성
// import awsExports from '../src/aws-exports';

// Amplify.configure({ ...awsExports, ssr: true });

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());  

function MyApp({ Component, pageProps, router }) {
  
  const [isLogin, setIsLogin] = useState(false);
  const router2 = useRouter();

  useEffect(() => {
    if (isLogin === false) {
      (async () => {
        try {
          const userInfo = await axios.get('api/user', { withCredentials: true });
          if (userInfo && userInfo.data && userInfo.data.userId) {
            setIsLogin(true);
          }
        }
        catch {
          console.log('로그인하세요');
        }
      })();
    }
  }, [isLogin]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router2.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router2.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router2.events]);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={router.pathname} classNames="page" timeout={400}>
        <Component {...pageProps} 
          loginHandler={loginHandler} 
          isLogin={isLogin}
        />
      </CSSTransition>
    </SwitchTransition>
  );
}

export default MyApp;