import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { useEffect, useState } from 'react';
import { useActions } from './hooks/useActions';
import { useCheckUserQuery } from './store/api/user.api';
import { AppRoutes } from './AppRoutes';
import { AppModals } from './components/AppModals';
import { AppLoading } from './components/AppLoading';

function App() {
  const { data, isLoading } = useCheckUserQuery();
  const { setAuthToken, setLoaderActive } = useActions();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const csrfHolder: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]');
    if (csrfHolder) {
      const CSRF_TOKEN = csrfHolder.content;
      setAuthToken(CSRF_TOKEN);
    }
  }, [setAuthToken]);

  useEffect(() => {
    if (data && !isLoading && !data.user) {
      const base64 = btoa(window.location.href);
      const redirectLink = `https://passport.borboza.com/passport/login?returl=${base64}`;
      window.location.replace(redirectLink);
    }

    if (data && data.user && data.user.role) {
      const checkAdmin = data.user.role === 'admin';
      setIsAdmin(checkAdmin);
    }

    setLoaderActive(isLoading);
  }, [data, isLoading, setLoaderActive]);

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes isAdmin={isAdmin} />
        <AppModals isAdmin={isAdmin} />
        <AppLoading />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
