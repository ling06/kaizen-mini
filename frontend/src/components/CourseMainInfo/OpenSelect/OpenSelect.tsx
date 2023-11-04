import { AdminBtn } from '@/components/AdminBtn';
import * as S from './styles';
import { ICourse } from '@/types/course.types';
import { ADMIN_BTN_TYPES } from '@/constants';

interface IOpenSelectProps {
  courseData: ICourse;
  onOpen: () => void;
}

export function OpenSelect({ courseData, onOpen }: IOpenSelectProps) {
  return (
    <S.Container>
      <S.Wrapper onClick={onOpen}>
        <S.CourseTitle>
          {courseData.title}
        </S.CourseTitle>
        <S.SelectIcon />
      </S.Wrapper>
      {courseData.status === 0 && <S.IsHiddenIcon />}
      <AdminBtn 
        type={ADMIN_BTN_TYPES.edit}
      />
    </S.Container>
  );
}
