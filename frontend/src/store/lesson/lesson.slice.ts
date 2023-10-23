import { IAnswer, ITest } from '@/types/lessonTest.types';
import { EmptyTest } from '@/utils/EmptyTest';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ILessonSlice {
  tests: Array<ITest>;
}

const lessonInitialState = {
  tests: [] as Array<ITest>,
};

interface IChangeTestQuestion {
  id: string;
  question: string;
}

interface IChangeAnswer {
  testId: string;
  answerId: string;
  data: Partial<IAnswer>;
}

interface IAddAnswer {
  id: string;
  data: Array<IAnswer>;
}

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState: lessonInitialState,
  reducers: {
    addEmptyTest: (state) => {
      state.tests.push(new EmptyTest());
    },
    addAnswer: (state, { payload }: PayloadAction<IAddAnswer>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.id);
      if (testIndex === -1) return;
      state.tests[testIndex].answers = payload.data;
    },
    setTestsData: (state, { payload }: PayloadAction<Array<ITest>>) => {
      state.tests = [...state.tests, ...payload];
    },
    changeTestQuestion: (state, { payload }: PayloadAction<IChangeTestQuestion>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.id);
      if (testIndex === -1) return;

      state.tests[testIndex].question = payload.question;
    },
    changeAnswerData: (state, { payload }: PayloadAction<Partial<IChangeAnswer>>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;
      const answerIndex = state.tests[testIndex].answers.findIndex(
        (answer) => answer.id === payload.answerId
      );
      if (answerIndex === -1) return;
      state.tests[testIndex].answers[answerIndex] = {
        ...state.tests[testIndex].answers[answerIndex],
        ...payload.data,
      };
    },
  },
});

export const { reducer, actions } = lessonSlice;
