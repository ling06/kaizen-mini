import { ITest } from '@/types/lessonTest.types';
import * as S from './styles';

interface ILessonTestProps {
  data: ITest;
}

export function LessonTest({ data }: ILessonTestProps) {
  return (
    <S.Container>
      <S.Title>
      {data.question}
      </S.Title>
    </S.Container>
  );
}
