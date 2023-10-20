import { ITest } from '@/types/lessonTest.types';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

export interface ILessonSlice {
  tests: Array<ITest>;
}

const lessonInitialState = {
  tests: [] as Array<ITest>,
};

const emptyTest: ITest = {
  id: '',
  question: '',
  answers: [
    {
      id: '',
      answer: '',
      right_answer: false,
      text: '',
    },
  ],
};

interface IChangeTestQuestion {
  id: string;
  question: string;
}

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState: lessonInitialState,
  reducers: {
    addEmptyTest: (state) => {
      emptyTest.id = nanoid();
      emptyTest.answers[0].id = nanoid();
      state.tests.push(emptyTest);
    },
    setTestsData: (state, { payload }: PayloadAction<Array<ITest>>) => {
      state.tests = [...state.tests, ...payload];
    },
    changeTestQuestion: (state, {payload}: PayloadAction<IChangeTestQuestion>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.id);
      if(testIndex === -1) return;

      state.tests[testIndex].question = payload.question;
    }
  },
});

export const { reducer, actions } = lessonSlice;
