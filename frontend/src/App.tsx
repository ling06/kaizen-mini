import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Main } from './pages/Main';
import { ModalLayout } from './layouts/ModalLayout';
import { MODAL_TYPES } from './constants';
import { CreateCourseForm } from './components/CreateCourseForm';
import { CreateChapterForm } from './components/CreateChapterForm';
import { CreateThemeForm } from './components/CreateThemeForm';
import { CreateLesson } from './pages/CreateLesson';
import { useEffect, useRef } from 'react';
import { useActions } from './hooks/useActions';
import { CreateNews } from './pages/CreateNews';
import { useCheckUserQuery } from './store/api/user.api';
import { Loading } from './components/Loading';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Transition } from 'react-transition-group';

function App() {
  const { isLoading } = useCheckUserQuery();
  const { setAuthToken, setLoaderActive: setActive } = useActions();
  const { isModalOpen, modalType } = useTypedSelector((state) => state.modal);
  const active = useTypedSelector((state) => state.loader.active);
  const loaderRef = useRef(null);

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
        <Routes>
          <Route
            path="/*"
            element={<Main />}
          />
          <Route
            path={'/courses/:courseId/:chapterId/:themeId/create-lesson'}
            element={<CreateLesson type="create" />}
          />
          <Route
            path={'/courses/:courseId/:chapterId/:themeId/:lessonId/edit-lesson'}
            element={<CreateLesson type="edit" />}
          />
          <Route
            path={'/news/create-news'}
            element={<CreateNews type={'create'} />}
          />
        </Routes>
        {isModalOpen && (
          <ModalLayout modalType={modalType}>
            {modalType === MODAL_TYPES.createCourse && <CreateCourseForm />}
            {modalType === MODAL_TYPES.editCourse && <CreateCourseForm />}
            {modalType === MODAL_TYPES.createChapter && <CreateChapterForm />}
            {modalType === MODAL_TYPES.editChapter && <CreateChapterForm />}
            {modalType === MODAL_TYPES.createTheme && <CreateThemeForm />}
            {modalType === MODAL_TYPES.editTheme && <CreateThemeForm />}
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
