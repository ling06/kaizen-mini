import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ILessonSlice {
  test: Array<>
}

const lessonInitialState = {
  tests: [], 
} 

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState: lessonInitialState,
  reducers: {
    addQuestion: (state, { payload }: PayloadAction<>) => {
      state.questions.push(payload);
    },
  }
})
