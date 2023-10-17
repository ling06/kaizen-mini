export interface ITest {
  id: number;
  lesson_id: number;
  is_active: number;
  user_id: number;
  date: string;
}

export interface IQuestion {
  id: number;
  test_id: number;
  is_open: number;
  text: string;
  answers: string;
  rightAnswer: string;
  user_id: number;
  date: string;
  userTestAnswer: IUserTestAnswer;
}

export interface IUserTestAnswer {
  test_question_id: number;
  user_id: number;
  answer: string;
  is_right: number;
  date: string;
}

export interface IAnswer {
  text: string;
  rightText: string;
  wrongText: string;
}

export interface IAddTestData extends Pick<ITest, 'lesson_id'> {}

export interface IUpdateTestData extends Pick<ITest, 'id' | 'is_active'> {}

export interface ICreateQuestionData
  extends Pick<IQuestion, 'test_id' | 'text' | 'answers' | 'rightAnswer'> {}

export interface IUpdateQuestionData
  extends Partial<Pick<IQuestion, 'answers' | 'text' | 'rightAnswer'>> {
  id: number;
}

export interface ISendAnswerData extends Pick<IUserTestAnswer, 'answer' | 'test_question_id'> {}

export interface ISendAnswerResData {
  result: boolean;
  message: string;
  data: {
    isRight: number;
    message: string;
  };
}
