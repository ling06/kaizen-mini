import { useActions } from '@/shared/lib/hooks/useActions';
import { ModalPosition } from '@/shared/model/types/common.types';
import { ICourse } from '@/shared/model/types/course.types';
import { css } from 'styled-components';
import * as S from './styles';


interface IOpenSelectProps {
  courseData: ICourse;
}

export function OpenSelect({ courseData }: IOpenSelectProps) {
  const { setModalOpen, setModalType, setModalPosition } = useActions();

  const titleStyles = css`
    @media ${(props) => props.theme.media.mobile} {
      font-size: 4.7vw;
      font-weight: 700;
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
        <S.CourseTitle
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
