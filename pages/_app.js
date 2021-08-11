import '../styles/main.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { Amplify, withSSRContext } from 'aws-amplify';
import awsExports from '../src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;