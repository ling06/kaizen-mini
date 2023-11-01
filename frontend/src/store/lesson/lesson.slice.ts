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
      const updatedTests = state.tests.filter((test) => test.id !== payload);
      return {
        ...state,
        tests: updatedTests,
      };
    },
    addAnswer: (state, { payload }: PayloadAction<IAddAnswer>) => {
      const { tests } = state;
      const testIndex = tests.findIndex((test) => test.id === payload.id);
      if (testIndex === -1) return state;
      const newTests = [...tests];
      newTests[testIndex] = {
        ...newTests[testIndex],
        answers: [...newTests[testIndex].answers, new EmptyAnswer()],
      };
      return {
        ...state,
        tests: newTests,
      };
    },
    deleteAnswer: (state, { payload }: PayloadAction<{ testId: string; answerId: string }>) => {
      const { testId, answerId } = payload;
      const { tests } = state;

      const testIndex = tests.findIndex((test) => test.id === testId);
      if (testIndex === -1) {
        return state;
      }
      tests[testIndex].answers = tests[testIndex].answers.filter(
        (answer) => answer.id !== answerId
      );

      return state;
    },
    setTestsData: (state, { payload }: PayloadAction<Array<ITest>>) => {
      state.tests = [...payload];
    },

    changeTestQuestion: (state, { payload }: PayloadAction<IChangeTestQuestion>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.id);
      if (testIndex === -1) {
        return state;
      }

      state.tests[testIndex].question = payload.question;
    },
    toggleAnswer: (state, { payload }: PayloadAction<IToggleAnswer>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;

      const changedAnswers = state.tests[testIndex].answers.map((answer) => {
        if (payload.isRight) {
          if (answer.id === payload.answerId && payload.isRight) {
            answer.right_answer = payload.isRight;
          } else {
            answer.right_answer = false;
          }
        } else {
          answer.right_answer = payload.isRight;
        }
        return answer;
      });

      state.tests[testIndex].answers = changedAnswers;
    },
    changeAnswer: (state, { payload }: PayloadAction<IChangeAnswer>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;

      const changedAnswers = state.tests[testIndex].answers.map((answer) => {
        if (payload.answerId === answer.id) {
          answer.answer = payload.value;
        }
        return answer;
      });

      state.tests[testIndex].answers = changedAnswers;
    },
    changeAnswerComment: (state, { payload }: PayloadAction<IChangeAnswer>) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.testId);
      if (testIndex === -1) return;

      const changedAnswers = state.tests[testIndex].answers.map((answer) => {
        if (payload.answerId === answer.id) {
          answer.text = payload.value;
        }
        return answer;
      });

      state.tests[testIndex].answers = changedAnswers;
    },
  },
});

export const { reducer, actions } = lessonSlice;
