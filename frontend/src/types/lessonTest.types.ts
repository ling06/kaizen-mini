export interface ITest {
  id: string;
  question: string;
  answers: Array<IAnswer>;
  userTestAnswer: null | IUserTestAnswer;
}

export interface IUserTestAnswer {
  answer: number;
  is_right: number;
}

export interface IAnswer {
  id?: string;
  answer: string;
  right_answer: boolean;
  text: string;
  answers?: string; // TODO: с бэка приходит answers, а не answer. В будущем надо решить этот вопрос.
}
