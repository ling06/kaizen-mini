import { IChapter } from '@/types/chapter.types';
import { ICourse } from '@/types/course.types';
import { ILesson } from '@/types/lesson.types';
import { ITheme } from '@/types/theme.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICourseInitialState extends Partial<ICourse> {
  activeCourseId: null | number;
  activeChapterId: null | number;
  activeTheme: ITheme | null;
  activeLesson: ILesson | null;
  updatingChapterData: IChapter | null;
}

const courseInitialState: ICourseInitialState = {
  activeCourseId: null,
  activeChapterId: null,
  activeTheme: null,
  activeLesson: null,
  updatingChapterData: null,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState: courseInitialState,
  reducers: {
    setActiveCourseId: (state, { payload }: PayloadAction<number>) => {
      state.activeCourseId = payload;
    },
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
    setUpdatingChapterData: (state, { payload }: PayloadAction<IChapter>) => {
      state.updatingChapterData = { ...payload };
    },
  },
});

export const { actions, reducer } = courseSlice;
