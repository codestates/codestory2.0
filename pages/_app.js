import '../styles/main.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Amplify, withSSRContext } from 'aws-amplify'; //배포 시 활성
import awsExports from '../src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());  

function MyApp({ Component, pageProps, router }) {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={router.pathname} classNames="page" timeout={500}>
        <Component {...pageProps} />
      </CSSTransition>
    </SwitchTransition>
  );
}
export default MyApp;