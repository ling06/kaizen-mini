import { AppRoutes } from "@/AppRoutes";
import { AppLoading } from "@/components/AppLoading";
import { AppModals } from "@/components/AppModals";
import { useActions } from "@/shared/lib/hooks/useActions";
import { Layout } from "@/shared/ui/layouts";
import { useCheckUserQuery } from "@/store/api/user.api";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";


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
