import { UserProvider } from '../components/UserContext';
import { Layout } from '../components/Layout';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <ToastContainer
          limit={1}
          transition={Bounce}
          autoClose={false}
          position={toast.POSITION.TOP_CENTER}
        />
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
