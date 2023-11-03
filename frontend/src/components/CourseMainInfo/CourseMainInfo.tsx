import * as S from './styles';
import defaultPreview from '@assets/images/defaultCoursePreview.png';
import { NavLink } from 'react-router-dom';
import { CourseBreadcrumb } from '../CourseBreadcrumb';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export function CourseMainInfo() {
  const courseData = useTypedSelector(state => state.course.data);
  const imageUrl = () => {
    if (courseData?.image) {
      return '.' + courseData.image.directory + '/' + courseData.image.name;
    }
    return defaultPreview;
  }
  return (
    <S.Container>
      <S.Wrapper>
        <CourseBreadcrumb
          containerStyles={{ marginBottom: '30px' }}
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
      <S.ImgWrapper>
        <S.Preview src={imageUrl()}/>
      </S.ImgWrapper>
    </S.Container>
  );
}
