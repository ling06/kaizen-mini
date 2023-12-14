import * as S from './styles';
import defaultPreview from '@assets/images/course-stub-img.webp';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseBreadcrumb } from '../CourseBreadcrumb';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/shared/model/constants';
import { ProgressInfo } from '../ProgressInfo';
import { OpenSelect } from './OpenSelect';
import { useGetCourseProgressQuery } from '@/store/api/course.api';
import { LoadingSmall } from '../LoadingSmall';
import { TCourse } from '@/entities/course';

interface ICourseMainInfoProps {
  data: TCourse['data'];
}
export function CourseMainInfo({ data }: Readonly<ICourseMainInfoProps>) {
  // const navigate = useNavigate();
  const isMobile = useMediaQuery(MediaQueries.mobile);
  // const { data: progressData, isError, isFetching } = useGetCourseProgressQuery(
  //   { course_id: Number(courseId) },
  //   {
  //     skip: !courseId,
  //   }
  // );

  
  // const handleGoToCurrentLesson = () => {
  //   if (data && 'chapter' in data) {
  //     navigate(`/courses/${courseId}/${data.chapter.id}/${data.theme.id}/${data.lesson.id}`);
  //   }
  // };
  
  const progressInfoStyles = {
    marginBottom: '3.13vw',
  };

  return (
    <S.Container>
      <S.Wrapper>
        {/* {isFetching && (
          <LoadingSmall />
        )} */}
        {isMobile && (
          <>
            <ProgressInfo
              percentage={`${data.percentage?.percentage}`}
              text="Твой курс закончен на"
              styles={progressInfoStyles}
            />
            <OpenSelect
              data={data}
            />
          </>
        )}
        {/* {data && 'chapter' in data && (
          <>
            <CourseBreadcrumb
              containerStyles={{ marginBottom: isMobile ? '5vw' : '30px' }}
              chapter={{ name: progressData.data.chapter.name, position: progressData.chapter.position, allQuantity: progressData.chapter.allQuantity }}
              theme={{ name: progressData.theme.name, position: progressData.theme.position, allQuantity: progressData.theme.allQuantity }}
              lesson={{ name: progressData.lesson.name, position: progressData.lesson.position, allQuantity: progressData.lesson.allQuantity }}
            />
            <S.LessonName>{data.lesson.name}</S.LessonName>
            <S.OpenCourse onClick={handleGoToCurrentLesson}>Учиться</S.OpenCourse>
          </>
        )} */}
        {data && 'courseComplete' in data && (
          <>
            <S.CourseName>
              {data.title}
            </S.CourseName>
            <S.CompleteStatus>
              Пройден
            </S.CompleteStatus>
          </>
        )}
        {/* {isError || data && 'error' in data && (
          <S.ErrorName>
            Информация отсутствует
          </S.ErrorName>
        )} */}
      </S.Wrapper>
      {!isMobile && (
        <S.ImgWrapper>
          <S.Preview
            src={data.image || defaultPreview}
            // onError={handleLoadError}
          />
        </S.ImgWrapper>
      )}
    </S.Container>
  );
}
