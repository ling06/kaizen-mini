import * as S from './styles';
import defaultPreview from '@assets/images/defaultCoursePreview.png';
import { NavLink } from 'react-router-dom';
import { CourseBreadcrumb } from '../CourseBreadcrumb';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/constants';
import { ProgressInfo } from '../ProgressInfo';
import { ICourse } from '@/types/course.types';
import { Popup } from './Popup';
import { OpenSelect } from './OpenSelect';

interface ICourseMainInfoProps {
  coursesData: Array<ICourse>;
}
export function CourseMainInfo({ coursesData }: ICourseMainInfoProps) {
  const courseData = useTypedSelector((state) => state.course.data);
  const [previewSrc, setPreviewSrc] = useState('');
  const isMobile = useMediaQuery(MediaQueries.mobile);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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

  const progressInfoStyles = {
    marginBottom: '3.13vw',
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  }

  return (
    <S.Container>
      <S.Wrapper>
        {isMobile && (
          <>
            <ProgressInfo
              percentage={`${courseData.percentage?.percentage}`}
              text="Твой курс закончен на"
              styles={progressInfoStyles}
            />
            <OpenSelect courseData={courseData} onOpen={handleOpenPopup}/>
          </>
        )}
        <CourseBreadcrumb
          containerStyles={{ marginBottom: isMobile ? '5vw' : '30px' }}
          chapter={{ name: '', position: '1', allQuantity: '5' }}
          theme={{ name: 'Наша новая капец какая тема', position: '3', allQuantity: '5' }}
          lesson={{ name: '', position: '3', allQuantity: '5' }}
        />
        <S.LessonName>
          В какой половине 1967 года в городе Ленинград родился российский шоумен, актёр театра и
          кино Дмитрий Владимирович Нагиев?
        </S.LessonName>
        <NavLink
          style={() => {
            return { display: 'block', marginTop: 'auto' };
          }}
          to={'/courses/courseId'}>
          <S.OpenCourse>Учиться</S.OpenCourse>
        </NavLink>
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
