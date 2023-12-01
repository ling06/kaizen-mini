import * as S from './styles';
import { ICourse } from '@/types/course.types';
import { useActions } from '@/hooks/useActions';
import { CourseTitle } from '@/components/CourseTitle';
import { css } from 'styled-components';
import { ModalPosition } from '@/types/common.types';

interface IOpenSelectProps {
  courseData: ICourse;
}

export function OpenSelect({ courseData }: IOpenSelectProps) {
  const { setModalOpen, setModalType, setModalPosition } = useActions();

  const titleStyles = css`
    @media ${(props) => props.theme.media.mobile} {
      font-size: 4.7vw;
    }
  `;

  const handleSelectCourse = () => {
    setModalPosition(ModalPosition.left);
    setModalOpen(true);
    setModalType('selectCourse');
  };

  return (
    <S.Container>
      <S.Wrapper onClick={handleSelectCourse}>
        <CourseTitle
          title={courseData.title}
          isDeleted={!!courseData.is_deleted}
          isHidden={!courseData.status}
          isSelected={true}
          styles={titleStyles}
        />
        <S.SelectIcon />
      </S.Wrapper>
      {courseData.status === 0 && <S.IsHiddenIcon />}
    </S.Container>
  );
}
