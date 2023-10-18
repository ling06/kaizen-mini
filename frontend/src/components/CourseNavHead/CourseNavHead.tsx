import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { IChapter } from '@/types/chapter.types';

interface ICourseNavHeadProps {
  data: IChapter;
}

export function CourseNavHead({ data }: ICourseNavHeadProps) {
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title as={'h3'}>{data.title}</S.Title>
        <AdminBtn
          type={'edit'}
          onClick={() => {}}
        />
      </S.TitleWrapper>
      <S.ProgressBar $progress={'70'} />
    </S.Container>
  );
}
