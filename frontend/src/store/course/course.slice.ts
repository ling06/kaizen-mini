import { IChapter } from '@/shared/model/types/chapter.types';
import { ICourse } from '@/shared/model/types/course.types';
import { ILesson } from '@/shared/model/types/lesson.types';
import { ITheme } from '@/shared/model/types/theme.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICourseInitialState extends Partial<ICourse> {
  data: ICourse;
  activeChapterId: null | number;
  activeTheme: ITheme | null;
  activeLesson: ILesson | null;
  updatingChapterData: IChapter | null;
  updatingThemeData: ITheme | null;
}

const courseInitialState: ICourseInitialState = {
  data: {
    id: 0,
    title: '',
    description: '',
    is_open: 0,
    status: 0,
    user_id: 0,
    date: '',
    is_deleted: 0,
    chapters: [],
    image: null,
  },
  activeChapterId: null,
  activeTheme: null,
  activeLesson: null,
  updatingChapterData: null,
  updatingThemeData: null,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState: courseInitialState,
  reducers: {
    setCourseData: (state, { payload }: PayloadAction<ICourse>) => {
      return {
        ...state,
        ...{ data: payload || courseInitialState.data },
      };
    },
    changeCourseData: (state, { payload }: PayloadAction<Partial<ICourse>>) => {
      state.data = <ICourse>{ ...state.data, ...payload };
    },
    setActiveChapterId: (state, { payload }) => {
      state.activeChapterId = payload;
    },
    addChapter: (state, { payload }) => {
      state.data.chapters?.push(payload);
    },
    changeChapter: (state, { payload }: PayloadAction<Partial<IChapter>>) => {
      if (!state.data || !state.data.chapters) {
        console.warn(`No chapters in course`);
        return;
      }
      const currentChapterIndex = state.data?.chapters?.findIndex(
        (chapter) => chapter.id === Number(payload.id)
      );

      if (currentChapterIndex === -1) {
        console.error(`No chapter with id: ${payload.id}`);
        return;
      }
      state.data.chapters[currentChapterIndex] = {
        ...state.data.chapters[currentChapterIndex],
        ...payload,
      };
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
    setUpdatingThemeData: (state, { payload }: PayloadAction<ITheme>) => {
      state.updatingThemeData = { ...payload };
    },
  },
});

export const { actions, reducer } = courseSlice;
