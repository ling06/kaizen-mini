import { IAnswer } from '@/shared/model/types/lessonTest.types';
import * as S from './styles';

interface ICheckedAnswer {
  data: IAnswer;
}
export function CheckedAnswer({ data }: ICheckedAnswer) {
  return (
    <S.Container>
      <S.Answer $isRight={!!data.right_answer}>{data.answer}</S.Answer>
      <S.Comment $isRight={!!data.right_answer}>{data.text}</S.Comment>
    </S.Container>
  );
}
