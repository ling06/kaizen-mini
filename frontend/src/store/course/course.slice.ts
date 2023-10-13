import { ICourse } from '@/types/course.types';
import { ILesson } from '@/types/lesson.types';
import { ITheme } from '@/types/theme.types';
import { createSlice } from '@reduxjs/toolkit';

export interface ICourseInitialState extends Partial<ICourse> {
  activeChapterId: null | number;
  activeTheme: ITheme | null;
  activeLesson: ILesson | null;
}

const courseInitialState: ICourseInitialState = {
  id: undefined,
  title: undefined,
  description: undefined,
  is_open: undefined,
  status: undefined,
  user_id: undefined,
  date: undefined,
  is_deleted: undefined,
  chapters: undefined,
  activeChapterId: null,
  activeTheme: null,
  activeLesson: null,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState: courseInitialState,
  reducers: {
    setCourseData: (state, { payload }) => ({ ...payload }),
    setActiveChapterId: (state, { payload }) => {
      state.activeChapterId = payload;
    },
    addChapter: (state, { payload }) => {
      state.chapters?.push(payload);
    },
    setActiveTheme: (state, { payload }) => {
      state.activeTheme = { ...payload };
    },
    setActiveLesson: (state, { payload }) => {
      state.activeLesson = { ...payload };
    },
  },
});

export const { actions, reducer } = courseSlice;
