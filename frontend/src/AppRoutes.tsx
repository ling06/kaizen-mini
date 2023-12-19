import { Route, Routes } from 'react-router-dom';
import { CourseMob } from './pages/CourseMob';
import { CreateCompetition } from './pages/CreateCompetition';
import { CreateLesson } from './pages/CreateLesson';
import { CreateNews } from './pages/CreateNews';
import { Main } from './pages/Main';
import { useMediaQuery } from './shared/lib/hooks/useMediaQuery';
import { MediaQueries } from './shared/model/constants';

const routes = [
  {
    path: '/*',
    element: <Main />,
  },
];

const adminRoutes = [
  {
    path: '/courses/:courseId/:chapterId/:themeId/create-lesson',
    element: <CreateLesson type="create" />,
  },
  {
    path: '/news/edit-news/:newsId',
    element: <CreateNews type={'edit'} />,
  },
  {
    path: '/news/competition/create-competition',
    element: <CreateCompetition type="create" />,
  },
  {
    path: '/news/competition/edit-competition/:competitionId',
    element: <CreateCompetition type="edit" />,
  },
  {
    path: '/courses/:courseId/:chapterId/:themeId/:lessonId/edit-lesson',
    element: <CreateLesson type="edit" />,
  },
  {
    path: '/news/create-news',
    element: <CreateNews type={'create'} />,
  },
];

const mobileRoutes = [
  {
    path: '/courses/:courseId/:chapterId/:themeId?/:lessonId?',
    element: <CourseMob />,
  },
];

interface IAppRoutesProps {
  isAdmin: boolean;
}

export function AppRoutes({ isAdmin }: IAppRoutesProps) {
  const isMobile = useMediaQuery(MediaQueries.mobile);

  return (
    <Routes>
      <>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </>
      {isAdmin && (
        <>
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </>
      )}
      {isMobile && (
        <>
          {mobileRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </>
      )}
    </Routes>
  );
}
