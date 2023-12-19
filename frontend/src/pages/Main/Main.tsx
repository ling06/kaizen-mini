import { Header } from '@/components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Courses } from '../Courses';
import { News } from '../News';
import { NotFound } from '../NotFound';
import { Users } from '../Users';
import { User } from '../User';

export function Main() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/news"/>}/>
        <Route
          path="/news/:newsId?/competitions?/:competitionId?"
          element={<News />}
        />
        <Route
          path="/courses/:courseId?/:chapterId?/:themeId?/:lessonId?"
          element={<Courses />}
        />
        <Route 
          path="/users"
          element={<Users />}
        />
        <Route 
          path="/users/:userId"
          element={<User />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
