import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Main } from './pages/Main';
import { ModalLayout } from './layouts/ModalLayout';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { IModalInitialState } from './store/modal/modal.slice';
import { MODAL_TYPES } from './constants';
import { CreateCourseForm } from './components/CreateCourseForm';
import { CreateChapterForm } from './components/CreateChapterForm';
import { CreateThemeForm } from './components/CreateThemeForm';
import { CreateLesson } from './pages/CreateLesson';
import { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { CreateNews } from './pages/CreateNews';
import { useCheckUserQuery } from './store/api/user.api';
import { Loading } from './components/Loading';

function App() {
  const { isLoading } = useCheckUserQuery();
  const { setAuthToken } = useActions();
  const { isModalOpen, modalType } = useSelector<RootState, IModalInitialState>(
    (state) => state.modal
  );

  useEffect(() => {
    const csrfHolder: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]');
    if(csrfHolder) {
      const CSRF_TOKEN = csrfHolder.content;
      setAuthToken(CSRF_TOKEN);
    }
  }, [setAuthToken]);

  return (
    <BrowserRouter>
      <Layout>
        {isLoading && <Loading />}
        <Routes>
          <Route
            path="/*"
            element={<Main />}
          />
          <Route
            path={'/courses/:courseId/:chapterId/:themeId/create-lesson'}
            element={<CreateLesson type="create" />}
          />
          <Route path={'/news/create-news'} element={<CreateNews type={'create'}/>}/>
        </Routes>
        {isModalOpen && (
          <ModalLayout modalType={modalType}>
            {modalType === MODAL_TYPES.createCourse && <CreateCourseForm />}
            {modalType === MODAL_TYPES.createChapter && <CreateChapterForm />}
            {modalType === MODAL_TYPES.createTheme && <CreateThemeForm />}
            {modalType === MODAL_TYPES.editCourse && <CreateCourseForm type='edit'/>}
          </ModalLayout>
        )}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
