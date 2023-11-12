import { useMemo } from 'react';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { IChapter } from '@/types/chapter.types';

interface ICourseNavHeadProps {
  data: IChapter;
}

export function CourseNavHead({ data }: ICourseNavHeadProps) {
  const chapterProgress = useMemo(() => {
    if (data) {
      let lessons = 0;
      let checkedlessons = 0;
      data.themes?.forEach((theme) => {
        theme.lessons?.forEach((lesson) => {
          if (lesson.isChecked) {
            checkedlessons++;
          }
          lessons++;
        });
      });
      return (checkedlessons / lessons) * 100;
    }
  }, [data]);

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title as={'h3'}>{data.title}</S.Title>
        <AdminBtn
          popupName="Глава"
          type={'edit'}
          onClick={() => {}}
        />
      </S.TitleWrapper>
      <S.ProgressBar $progress={`${chapterProgress}`} />
    </S.Container>
  );
}
