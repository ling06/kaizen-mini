import { AppRoutes } from '@/AppRoutes';
import { AppLoading } from '@/components/AppLoading';
import { AppModals } from '@/components/AppModals';
import { useLogin } from '@/entities/user';
import { Layout } from '@/shared/ui/layouts';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  useLogin();

  useEffect(() => {
    console.log('re-render');
    
  })

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes isAdmin={true} />
        <AppModals isAdmin={true} />
        <AppLoading />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
