import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import * as S from './styles';
import { AdminBtn } from '../AdminBtn';
import { useActions } from '@/hooks/useActions';

export function CourseSelect() {
  const { setModalOpen, setModalType } = useActions();

  const openCreateCourseModal = () => {
    setModalType(MODAL_TYPES.createCourse)
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Select>
        <S.Progress>58 %</S.Progress>
        <S.CourseName>Курс: Я — продаю Ямагучи</S.CourseName>
      </S.Select>
      <AdminBtn type={ADMIN_BTN_TYPES.add} onClick={openCreateCourseModal}/>
    </S.Container>
  );
}
