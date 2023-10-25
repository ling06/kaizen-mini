import { ITest } from '@/types/lessonTest.types';
import * as S from './styles';
import { Checkbox } from './CheckBox';


interface ILessonTestProps {
  data: ITest;
}

export function LessonTest({ data }: ILessonTestProps) {
  return (
    <S.Container>
      <S.Title>
      {data.question}
      </S.Title>
      <div>
        {data.answers.map((answer) => <Checkbox label={`${answer.answers}`}/>)}
      </div>
    </S.Container>
  );
}
