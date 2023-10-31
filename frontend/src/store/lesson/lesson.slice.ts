import { ITest } from '@/types/lessonTest.types';
import { EmptyAnswer } from '@/utils/EmptyAnswer';
import { EmptyTest } from '@/utils/EmptyTest';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ILessonSlice {
  tests: Array<ITest>;
}

const lessonInitialState = {
  tests: [] as Array<Omit<ITest, 'userTestAnswer'>>,
};

interface IChangeTestQuestion {
  id: string;
  question: string;
}

interface IChangeAnswer {
  testId: string;
  answerId: string;
  value: string;
}

interface IAddAnswer {
  id: string;
}

interface IToggleAnswer {
  testId: string;
  answerId: string;
  isRight: boolean;
}

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState: lessonInitialState,
  reducers: {
    addEmptyTest: (state) => {
      state.tests.push(new EmptyTest());
    },
    deleteTest: (state, { payload }: PayloadAction<string>) => {
      let tests = state.tests;
      tests = tests.filter((test) => test.id !== payload);
      return {
        ...state,
        ...{tests},
      };
    },
    addAnswer: (state, { payload }: PayloadAction<IAddAnswer>) => {
      const tests = state.tests;
      const testIndex = tests.findIndex((test) => test.id === payload.id);
      if (testIndex === -1) return;
      tests[testIndex].answers.push(new EmptyAnswer());
      return {
        ...state,
        ...{ tests },
      };
    },
    deleteAnswer: (state, { payload }: PayloadAction<{ testId: string; answerId: string }>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;
      state.tests[testIndex].answers = state.tests[testIndex].answers.filter(
        (answer) => answer.id !== payload.answerId
      );
      return {
        ...state,
      };
    },
    setTestsData: (state, { payload }: PayloadAction<Array<ITest>>) => {
      state.tests = [...state.tests, ...payload];
    },
    changeTestQuestion: (state, { payload }: PayloadAction<IChangeTestQuestion>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.id);
      if (testIndex === -1) return;

      state.tests[testIndex].question = payload.question;
      return {
        ...state,
      };
    },
    toggleAnswer: (state, { payload }: PayloadAction<IToggleAnswer>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;

      state.tests[testIndex].answers.forEach((answer) => {
        if (payload.isRight) {
          if (answer.id === payload.answerId && payload.isRight) {
            answer.right_answer = payload.isRight;
            return;
          }
          answer.right_answer = false;
        } else {
          answer.right_answer = payload.isRight;
        }
      });

      return {
        ...state,
      };
    },
    changeAnswer: (state, { payload }: PayloadAction<IChangeAnswer>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;

      state.tests[testIndex].answers.forEach((answer) => {
        if (payload.answerId === answer.id) {
          answer.answer = payload.value;
        }
      });

      return {
        ...state,
      };
    },
    changeAnswerComment: (state, { payload }: PayloadAction<IChangeAnswer>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;

      state.tests[testIndex].answers.forEach((answer) => {
        if (payload.answerId === answer.id) {
          answer.text = payload.value;
        }
      });

      return {
        ...state,
      };
    },
  },
});

export const { reducer, actions } = lessonSlice;
