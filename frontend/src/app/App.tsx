import { AppRoutes } from '@/AppRoutes';
import { AppLoading } from '@/components/AppLoading';
import { AppModals } from '@/components/AppModals';
import { useLogin } from '@/entities/auth';
import { Layout } from '@/shared/ui/layouts';
import { BrowserRouter } from 'react-router-dom';
 function App() {
  const [authToken] = useLogin();
  
  return (
    <BrowserRouter>
      <Layout>
        {authToken && (
          <>
            <AppRoutes isAdmin={true} />
            <AppModals isAdmin={true} />
          </>
        )}
        <AppLoading />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
