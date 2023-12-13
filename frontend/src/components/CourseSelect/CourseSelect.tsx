import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/shared/model/constants';
import * as S from './styles';
import { useActions } from '@/shared/lib/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { CourseTitle } from '../CourseTitle';
import { CourseProgress } from '../CourseProgress';
import { css } from 'styled-components';
import { ModalPosition } from '@/shared/model/types/common.types';

export function CourseSelect() {
  const { setModalOpen, setModalType, setModalPosition } = useActions();

  const courseData = useTypedSelector((state) => state.course.data);

  const marginRight = css`
    margin-right: 20px;
  `;

  const handleOpenSelectCourseModal = () => {
    setModalType(MODAL_TYPES.selectCourse);
    setModalOpen(true);
    setModalPosition(ModalPosition.left);
  };

  const handleCreateCourse = () => {
    setModalOpen(true);
    setModalType('createCourse');
  };

  return (
    <S.Container>
      <S.CourseName onClick={handleOpenSelectCourseModal}>
        <CourseProgress
          percentage={courseData.percentage?.percentage || 0}
          styles={marginRight}
          isHidden={!courseData.status || !!courseData.is_deleted}
        />
        <CourseTitle
          title={courseData.title}
          isSelected={true}
          styles={marginRight}
          isDeleted={!!courseData.is_deleted}
          isHidden={!courseData.status}
        />
        <S.SelectIcon />
      </S.CourseName>
      <AdminBtn
        popupName="Курс"
        type={ADMIN_BTN_TYPES.add}
        onClick={handleCreateCourse}
      />
    </S.Container>
  );
}
