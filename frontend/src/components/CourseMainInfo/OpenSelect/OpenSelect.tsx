import { useActions } from '@/shared/lib/hooks/useActions';
import { ModalPosition } from '@/shared/model/types/common.types';
import { ICourse } from '@/shared/model/types/course.types';
import * as S from './styles';
import { CourseTitle } from '@/components/CourseTitle';

interface IOpenSelectProps {
  courseData: ICourse;
}

export function OpenSelect({ courseData }: IOpenSelectProps) {
  const { setModalOpen, setModalType, setModalPosition } = useActions();

  const handleSelectCourse = () => {
    setModalPosition(ModalPosition.left);
    setModalOpen(true);
    setModalType('selectCourse');
  };

  return (
    <S.Container>
      <S.Wrapper onClick={handleSelectCourse}>
        <CourseTitle
          isDeleted={!!courseData.is_deleted}
          title={courseData.title}
          isHidden={!courseData.status}
          isSelected={true}
        />
        <S.SelectIcon />
      </S.Wrapper>
      {courseData.status === 0 && <S.IsHiddenIcon />}
    </S.Container>
  );
}
