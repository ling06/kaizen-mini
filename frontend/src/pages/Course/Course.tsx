import { CourseNavBody } from '@/components/CourseNavBody';
import * as S from './styles';
import { CourseNavHead } from '@/components/CourseNavHead';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';
import { CourseContent } from '@/components/CourseContent';
import { useGetChapterByIdQuery } from '@/store/api/chapter.api';

export function Course() {
  const { setActiveChapterId, setLoaderActive } = useActions();
  const { chapterId } = useParams();
  const { data, isError, isFetching } = useGetChapterByIdQuery(Number(chapterId));

  useEffect(() => {
    setLoaderActive(isFetching);
  }, [isFetching, setLoaderActive]);

  useEffect(() => {
    if (chapterId) {
      setActiveChapterId(chapterId);
    }
  }, [chapterId, setActiveChapterId]);

  return (
    <>
      {isError && <ErrorBlock />}
      <S.Container>
        <S.NavContainer>
          {data && (
            <>
              <CourseNavHead data={data.data} />
              <CourseNavBody data={data.data} />
            </>
          )}
        </S.NavContainer>
        <S.ContentContainer>
          <CourseContent />
        </S.ContentContainer>
      </S.Container>
    </>
  );
}
