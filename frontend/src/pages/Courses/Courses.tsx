import { Routes, Route } from 'react-router-dom';
import { CoursePreview } from '../CoursePreview';
import { Course } from '../Course';

export function Courses() {
  return (
    <>
      <Routes>
        <Route
          path="/:courseId?"
          element={<CoursePreview />}
        />
        <Route
          path="/:courseId/:chapterId/:themeId?/:lessonId?"
          element={<Course />}
        />
      </Routes>
    </> 
  );
}
