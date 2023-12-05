import { Routes, Route } from 'react-router-dom';
import { CoursePreview } from '../CoursePreview';
import { Course } from '../Course';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/shared/model/constants';

export function Courses() {
  const isMobile = useMediaQuery(MediaQueries.mobile);
  return (
    <>
      <Routes>
        <Route
          path="/:courseId?"
          element={<CoursePreview />}
        />
        {!isMobile && (
          <Route
            path="/:courseId/:chapterId/:themeId?/:lessonId?"
            element={<Course />}
          />
        )}
      </Routes>
    </>
  );
}
