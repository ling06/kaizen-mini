import { useRef, useState } from 'react';
import { AdminBtn } from '../AdminBtn';
import { CourseNavLesson } from '../CourseNavLesson';
import { DndBtn } from '../DndBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ITheme } from '@/types/theme.types';

interface ICourseNavTheme {
  data: ITheme;
}

export function CourseNavTheme({ data }: ICourseNavTheme) {
  const [isAccordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [accordionWrapperHeight, setAccordionWrapperHeight] = useState<string>('0px');
  const lessonsList = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
    if (lessonsList.current) {
      const lessonsListHeight = lessonsList.current.getBoundingClientRect();
      setAccordionWrapperHeight(`${lessonsListHeight.height}px`);
    }
  };

  const addLesson = () => {
    navigate(currentLocation.pathname + '/chapterId/themeId/create-lesson/lessonId');
  };

  return (
    <S.Container>
      <S.Theme>
        <DndBtn
          onClick={() => {}}
          styles={{ marginRight: '20px' }}
        />
        <S.OpenAccordion onClick={toggleAccordion}>
          <C.AccordionIcon $active={isAccordionOpen} />
          <C.CourseNavText $active={true}>{data.title}</C.CourseNavText>
        </S.OpenAccordion>
        <C.DoneIcon />
        <AdminBtn
          type={'edit'}
          onClick={() => {}}
          popupHandlers={{ onAdd: addLesson }}
        />
      </S.Theme>
      <S.AccordionWrapper
        $active={isAccordionOpen}
        $height={accordionWrapperHeight}>
        <S.LessonsList ref={lessonsList}>
          <CourseNavLesson />
          <CourseNavLesson />
          <CourseNavLesson />
          <CourseNavLesson />
          <CourseNavLesson />
          <CourseNavLesson />
        </S.LessonsList>
      </S.AccordionWrapper>
    </S.Container>
  );
}
