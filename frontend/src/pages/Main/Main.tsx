import { Header } from '@/components/Header';
import { Route, Routes } from 'react-router-dom';
import { Courses } from '../Courses';
import { News } from '../News';
import { NotFound } from '../NotFound';
import { Users } from '../Users';

export function Main() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/news/*"
          element={<News />}
        />
        <Route
          path="/courses/*"
          element={<Courses />}
        />
        <Route 
          path="/*"
          element={<NotFound />}
        />
        <Route 
          path="/users"
          element={<Users />}
        />
      </Routes>
    </>
  );
}
