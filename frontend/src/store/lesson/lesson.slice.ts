import { ITest } from "@/shared/model/types/lessonTest.types";
import { EmptyAnswer } from "@/shared/lib/EmptyAnswer";
import { EmptyTest } from "@/shared/lib/EmptyTest";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILessonSlice {
  tests: Array<Omit<ITest, "userTestAnswer">>;
  navPopup: boolean;
}

const lessonInitialState: ILessonSlice = {
  tests: [],
  navPopup: false,
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
  name: "lesson",
  initialState: lessonInitialState,
  reducers: {
    addEmptyTest: (state) => {
      let tests = state.tests;
      tests = [...tests, new EmptyTest()];
      return {
        ...state,
        tests,
      };
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
    deleteAnswer: (
      state,
      { payload }: PayloadAction<{ testId: string; answerId: string }>
    ) => {
      const { testId, answerId } = payload;

      const testIndex = state.tests.findIndex((test) => test.id === testId);
      if (testIndex === -1) {
        return state;
      }
      const filteredAnswers = state.tests[testIndex].answers.filter(
        (answer) => answer.id !== answerId
      );

      const modifyTests = state.tests.map((test) => {
        if (test.id === testId) {
          test.answers = filteredAnswers;
        }
        return test;
      });

      state.tests = modifyTests;
    },
    setTestsData: (state, { payload }: PayloadAction<Array<ITest>>) => {
      state.tests = [...payload];
    },

    resetTestsData: (state) => {
      state.tests = [];
    },

    changeTestQuestion: (
      state,
      { payload }: PayloadAction<IChangeTestQuestion>
    ) => {
      const testIndex = state.tests.findIndex((test) => test.id === payload.id);
      if (testIndex === -1) {
        return state;
      }

      const modifyTests = state.tests.map((test) => {
        if (test.id === payload.id) {
          test.question = payload.question;
        }
        return test;
      });
      state.tests = modifyTests;
    },
    toggleAnswer: (state, { payload }: PayloadAction<IToggleAnswer>) => {
      const testIndex = state.tests.findIndex(
        (test) => test.id === payload.testId
      );
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

      const modifyTests = state.tests.map((test) => {
        if (test.id === payload.testId) {
          test.answers = changedAnswers;
        }
        return test;
      });

      state.tests = modifyTests;
    },
    changeAnswer: (state, { payload }: PayloadAction<IChangeAnswer>) => {
      const testIndex = state.tests.findIndex(
        (test) => test.id === payload.testId
      );
      if (testIndex === -1) return;

      const changedAnswers = state.tests[testIndex].answers.map((answer) => {
        if (payload.answerId === answer.id) {
          answer.answer = payload.value;
        }
        return answer;
      });

      const modifyTests = state.tests.map((test) => {
        if (test.id === payload.testId) {
          test.answers = changedAnswers;
        }
        return test;
      });

      state.tests = modifyTests;
    },
    changeAnswerComment: (state, { payload }: PayloadAction<IChangeAnswer>) => {
      const testIndex = state.tests.findIndex(
        (test) => test.id === payload.testId
      );
      if (testIndex === -1) return;

      const changedAnswers = state.tests[testIndex].answers.map((answer) => {
        if (payload.answerId === answer.id) {
          answer.text = payload.value;
        }
        return answer;
      });

      const modifyTests = state.tests.map((test) => {
        if (test.id === payload.testId) {
          test.answers = changedAnswers;
        }
        return test;
      });

      state.tests = modifyTests;
    },
    setNavPopup: (state, { payload }: PayloadAction<boolean>) => {
      state.navPopup = payload;
    },
  },
});

export const { reducer, actions } = lessonSlice;
