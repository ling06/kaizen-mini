import { nanoid } from "@reduxjs/toolkit";

export class EmptyAnswer {
  id: string;
  answer: '';
  right_answer: boolean;
  text: string;

  constructor() {
    this.id = nanoid();
    this.answer = '';
    this.right_answer = false;
    this.text = '';
  }
}
