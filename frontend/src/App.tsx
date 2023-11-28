import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { ModalLayout } from './layouts/ModalLayout';
import { MODAL_TYPES } from './constants';
import { CreateCourseForm } from './components/CreateCourseForm';
import { CreateChapterForm } from './components/CreateChapterForm';
import { CreateThemeForm } from './components/CreateThemeForm';
import { useEffect, useRef, useState } from 'react';
import { useActions } from './hooks/useActions';
import { useCheckUserQuery } from './store/api/user.api';
import { Loading } from './components/Loading';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Transition } from 'react-transition-group';
import { NewsCategoryForm } from './components/NewsCategoryForm';
import { AppRoutes } from './AppRoutes';

function App() {
  const { data, isLoading } = useCheckUserQuery();
  const { setAuthToken, setLoaderActive: setActive } = useActions();
  const { isModalOpen, modalType } = useTypedSelector((state) => state.modal);
  const active = useTypedSelector((state) => state.loader.active);
  const loaderRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (data && !isLoading && !data.user) {
      const base64 = btoa(window.location.href);
      const redirectLink = `https://passport.borboza.com/passport/login?returl=${base64}`;
      window.location.replace(redirectLink);
    }

    if(data && data.user && data.user.role) {
      const checkAdmin = data.user.role === 'admin';
      setIsAdmin(checkAdmin);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setActive(isLoading);
  }, [isLoading, setActive]);

  useEffect(() => {
    const csrfHolder: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]');
    if (csrfHolder) {
      const CSRF_TOKEN = csrfHolder.content;
      setAuthToken(CSRF_TOKEN);
    }
  }, [setAuthToken]);

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes isAdmin={isAdmin} />
        
        {isModalOpen && data && data.user && data.user.role === 'admin' && (
          <ModalLayout modalType={modalType}>
            {modalType === MODAL_TYPES.createCourse && <CreateCourseForm />}
            {modalType === MODAL_TYPES.editCourse && <CreateCourseForm />}
            {modalType === MODAL_TYPES.createChapter && <CreateChapterForm />}
            {modalType === MODAL_TYPES.editChapter && <CreateChapterForm />}
            {modalType === MODAL_TYPES.createTheme && <CreateThemeForm />}
            {modalType === MODAL_TYPES.editTheme && <CreateThemeForm />}
            {modalType === MODAL_TYPES.newsCategory && <NewsCategoryForm />}
          </ModalLayout>
        )}
        <Transition
          unmountOnExit
          nodeRef={loaderRef}
          timeout={300}
          in={active}>
          {(state) => (
            <Loading
              innerRef={loaderRef}
              state={state}
            />
          )}
        </Transition>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
