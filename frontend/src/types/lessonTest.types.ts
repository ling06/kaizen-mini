export interface ITest {
  id: string;
  question: string;
  answers: Array<IAnswer>;
}

export interface IAnswer {
  id: string;
  answer: string;
  right_answer: string | boolean;
  text: string;
}
