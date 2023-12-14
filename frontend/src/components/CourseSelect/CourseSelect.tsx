import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/shared/model/constants';
import * as S from './styles';
import { useActions } from '@/shared/lib/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { CourseTitle } from '../CourseTitle';
import { CourseProgress } from '../CourseProgress';
import { css } from 'styled-components';
import { ModalPosition } from '@/shared/model/types/common.types';
import { TCourse } from '@/entities/course';

interface ICourseSelectProps {
  data: TCourse['data'];
}

export function CourseSelect({data}: Readonly<ICourseSelectProps>) {
  const { setModalOpen, setModalType, setModalPosition } = useActions();

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
          percentage={data.percentage?.percentage || 0}
          styles={marginRight}
          isHidden={!data.status || !!data.is_deleted}
        />
        <CourseTitle
          title={data.title}
          isSelected={true}
          styles={marginRight}
          isDeleted={!!data.is_deleted}
          isHidden={!data.status}
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
