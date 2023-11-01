import { IAnswer } from "@/types/lessonTest.types";
import { nanoid } from "@reduxjs/toolkit";


export class EmptyTest {
  id: string;
  question: string;
  answers: Array<IAnswer>;

  constructor() {
    this.id = nanoid();
    this.question = '';
    this.answers = [
      {
        id: nanoid(),
        answer: '',
        right_answer: false,
        text: '',
      },
      {
        id: nanoid(),
        answer: '',
        right_answer: false,
        text: '',
      },
    ];
  }
}
