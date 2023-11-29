export interface ITest {
  id: string;
  question: string;
  answers: Array<IAnswer>;
  userTestAnswer: Array<IUserTestAnswer>;
}

export interface IUserTestAnswer {
  answer: number;
  is_right: number;
}

export interface IAnswer {
  id: string;
  answer: string;
  right_answer: string;
  text: string;
}
