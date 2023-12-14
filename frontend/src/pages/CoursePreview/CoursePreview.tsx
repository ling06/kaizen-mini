import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@/shared/ui/assets/styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { MODAL_TYPES, MediaQueries } from '@/shared/model/constants';
import { useGetCourseQuery } from '@/entities/course';
import { ModalPosition } from '@/shared/model/types/common.types';
import { Button } from '@/shared/ui/components';

export function CoursePreview() {
  const {setModalPosition, setModalOpen, setModalType } =
    useActions();
  const params = useParams();
  const { data, isError } = useGetCourseQuery(params.courseId ?? '', {
    skip: !params.courseId,
  });
  const isMobile = useMediaQuery(MediaQueries.mobile);

  const openCoursesModal = useCallback(() => {
    setModalOpen(true);
    setModalType(MODAL_TYPES.selectCourse);
    setModalPosition(ModalPosition.left);
  }, [setModalOpen, setModalPosition, setModalType]);

  useEffect(() => {
    if (!params.courseId) {
      openCoursesModal();
    }
  }, [openCoursesModal, params.courseId]);

  return (
    <C.DefaultContainer>
      <S.Container>
        {isError && <ErrorBlock />}
        {data && !isError && (
          <>
            {!isMobile && <CourseSelect data={data.data} />}
            <CourseMainInfo data={data.data} />
            <CourseProgramm />
          </>
        )}
        {!params.courseId && (
          <S.NotSelectedCourse>
            <Button text={'Выбрать курс'} onClick={openCoursesModal} />
          </S.NotSelectedCourse>
        )}
      </S.Container>
    </C.DefaultContainer>
  );
}
