import { useActions } from '@/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { CourseNavTheme } from '../CourseNavTheme';
import * as S from './styles';
import { MODAL_TYPES } from '@/constants';


export function CourseNavBody() {
  const {setModalType, setModalOpen} = useActions();

  const openCreateThemeModal = () => {
    setModalType(MODAL_TYPES.createTheme);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Title>
        Темы главы
        <AdminBtn
          type={'add'}
          onClick={openCreateThemeModal}
        />
      </S.Title>
      <S.Container>
        <CourseNavTheme />
      </S.Container>
    </S.Container>
  );
}
