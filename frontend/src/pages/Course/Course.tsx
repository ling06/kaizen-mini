import { CourseNavBody } from '@/components/CourseNavBody';
import * as S from './styles';
import { CourseNavHead } from '@/components/CourseNavHead';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useEffect, useRef } from 'react';
import { CourseContent } from '@/components/CourseContent';
import { useGetChapterByIdQuery } from '@/store/api/chapter.api';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/constants';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { NavPopup } from '@/components/NavPopup';

export function Course() {
  const { setActiveChapterId, setLoaderActive, setNavPopup } = useActions();
  const { chapterId, lessonId } = useParams();
  const { data, isError, isFetching } = useGetChapterByIdQuery(Number(chapterId));
  const isMobile = useMediaQuery(MediaQueries.mobile);
  const isNavPopup = useTypedSelector((state) => state.lesson.navPopup);
  const ContentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lessonId ? setNavPopup(false) : setNavPopup(true);
    if (ContentContainer && ContentContainer.current && data && !isFetching) {
      ContentContainer.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [data, isFetching, lessonId, setNavPopup]);

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
        <S.bodyOverflow />
        {!isMobile && data && (
          <S.NavContainer>
            <CourseNavHead data={data.data} />
            <CourseNavBody data={data.data} />
          </S.NavContainer>
        )}
        {isMobile && data && isNavPopup && <NavPopup chapterData={data.data} />}
        <S.ContentContainer ref={ContentContainer}>
          <CourseContent />
        </S.ContentContainer>
      </S.Container>
    </>
  );
}
