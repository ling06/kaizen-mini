import * as S from './styles';
import defaultPreview from '@assets/images/course-stub-img.webp';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseBreadcrumb } from '../CourseBreadcrumb';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/shared/constants';
import { ProgressInfo } from '../ProgressInfo';
import { ICourse } from '@/shared/types/course.types';
import { Popup } from './Popup';
import { OpenSelect } from './OpenSelect';
import { useGetCourseProgressQuery } from '@/store/api/course.api';
import { LoadingSmall } from '../LoadingSmall';

interface ICourseMainInfoProps {
  coursesData: Array<ICourse>;
}
export function CourseMainInfo({ coursesData }: ICourseMainInfoProps) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseData = useTypedSelector((state) => state.course.data);
  const [previewSrc, setPreviewSrc] = useState('');
  const isMobile = useMediaQuery(MediaQueries.mobile);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { data, isError, isFetching } = useGetCourseProgressQuery(
    { course_id: Number(courseId) },
    {
      skip: !courseId,
    }
  );

  useEffect(() => {
    if (courseData.image) {
      const src = courseData.image.directory + '/' + courseData.image.name;
      setPreviewSrc(src);
      return;
    }
    setPreviewSrc(defaultPreview);
  }, [courseData.image]);

  const handleLoadError = () => {
    setPreviewSrc(defaultPreview);
  };

  
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  
  const handleGoToCurrentLesson = () => {
    if (data && 'chapter' in data) {
      navigate(`/courses/${courseId}/${data.chapter.id}/${data.theme.id}/${data.lesson.id}`);
    }
  };
  
  const progressInfoStyles = {
    marginBottom: '3.13vw',
  };

  return (
    <S.Container>
      <S.Wrapper>
        {isFetching && (
          <LoadingSmall />
        )}
        {isMobile && (
          <>
            <ProgressInfo
              percentage={`${courseData.percentage?.percentage}`}
              text="Твой курс закончен на"
              styles={progressInfoStyles}
            />
            <OpenSelect
              courseData={courseData}
              onOpen={handleOpenPopup}
            />
          </>
        )}
        {data && 'chapter' in data && (
          <>
            <CourseBreadcrumb
              containerStyles={{ marginBottom: isMobile ? '5vw' : '30px' }}
              chapter={{ name: data.chapter.name, position: data.chapter.position, allQuantity: data.chapter.allQuantity }}
              theme={{ name: data.theme.name, position: data.theme.position, allQuantity: data.theme.allQuantity }}
              lesson={{ name: data.lesson.name, position: data.lesson.position, allQuantity: data.lesson.allQuantity }}
            />
            <S.LessonName>{data.lesson.name}</S.LessonName>
            <S.OpenCourse onClick={handleGoToCurrentLesson}>Учиться</S.OpenCourse>
          </>
        )}
        {data && 'courseComplete' in data && (
          <>
            <S.CourseName>
              {courseData.title}
            </S.CourseName>
            <S.CompleteStatus>
              Пройден
            </S.CompleteStatus>
          </>
        )}
        {isError || data && 'error' in data && (
          <S.ErrorName>
            Информация отсутствует
          </S.ErrorName>
        )}
      </S.Wrapper>
      {!isMobile && (
        <S.ImgWrapper>
          <S.Preview
            src={previewSrc}
            onError={handleLoadError}
          />
        </S.ImgWrapper>
      )}
      {isPopupOpen && (
        <Popup
          coursesData={coursesData}
          onClose={handleClosePopup}
        />
      )}
    </S.Container>
  );
}
