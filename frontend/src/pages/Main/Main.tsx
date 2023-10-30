import { Header } from '@/components/Header';
import { Route, Routes } from 'react-router-dom';
import { Courses } from '../Courses';
import { News } from '../News';

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
        {/* <Route
          path="/tasks/*"
          element={<div>TASKS</div>}
        /> */}
      </Routes>
    </>
  );
}
