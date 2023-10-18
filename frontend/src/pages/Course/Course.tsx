import { CourseNavBody } from '@/components/CourseNavBody';
import * as S from './styles';
import { CourseNavHead } from '@/components/CourseNavHead';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useEffect, useState } from 'react';
import { CourseContent } from '@/components/CourseContent';
import { useGetChapterByIdQuery } from '@/store/api/chapter.api';

export function Course() {
  const { setActiveChapterId } = useActions();
  const { chapterId, lessonId } = useParams();
  const { data, isError } = useGetChapterByIdQuery(Number(chapterId));
  const [activeChapterId, setActiveChapter] = useState<typeof chapterId>(undefined);

  useEffect(() => {
    if (data) {
      setActiveChapter(chapterId);
    }
  }, [chapterId, data, lessonId]);

  useEffect(() => {
    setActiveChapterId(activeChapterId);
  }, [activeChapterId, setActiveChapterId]);

  return (
    <>
      {isError && <ErrorBlock />}
      {data && (
        <S.Container>
          <S.NavContainer>
            <CourseNavHead data={data.data} />
            <CourseNavBody data={data.data}/>
          </S.NavContainer>
          <S.ContentContainer>
            <CourseContent />
          </S.ContentContainer>
        </S.Container>
      )}
    </>
  );
}
