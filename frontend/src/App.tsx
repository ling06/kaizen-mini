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

function App() {
  const { setAuthToken } = useActions();
  const { isModalOpen, modalType } = useSelector<RootState, IModalInitialState>(
    (state) => state.modal
  );

    useEffect(() => {
      const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]')?.content;
      setAuthToken(CSRF_TOKEN);
    })

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/*"
            element={<Main />}
          />
          <Route path={'/courses/:courseId/:chapterId/:themeId/create-lesson/:lessonId'} element={<CreateLesson type='create'/>}/>
        </Routes>
        {isModalOpen && (
          <ModalLayout modalType={modalType}>
            {modalType === MODAL_TYPES.createCourse && <CreateCourseForm />}
            {modalType === MODAL_TYPES.createChapter && <CreateChapterForm />}
            {modalType === MODAL_TYPES.createTheme && <CreateThemeForm />}
          </ModalLayout>
        )}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
