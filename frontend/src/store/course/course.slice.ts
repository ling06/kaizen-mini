import { ICourse } from '@/types/course.types';
import { createSlice } from '@reduxjs/toolkit';

export interface ICourseInitialState extends Partial<ICourse> {
  activeChapterId: null | number;
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
    }
  },
});

export const { actions, reducer } = courseSlice;
