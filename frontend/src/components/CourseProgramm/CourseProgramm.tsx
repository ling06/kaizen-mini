import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { CourseProgrammCard } from './CourseProgrammCard';
import { useActions } from '@/hooks/useActions';

export function CourseProgramm() {
  const { setModalOpen, setModalType } = useActions();

  const openCreateCourseModal = () => {
    setModalType(MODAL_TYPES.createChapter)
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Head>
        <S.Title as={'h4'}>Программа курса</S.Title>
        <AdminBtn type={ADMIN_BTN_TYPES.add} onClick={openCreateCourseModal}/>
      </S.Head>
      <S.CardList>
        {[1, 2, 3, 4 ,5].map((chapter) => <CourseProgrammCard data={chapter}/>)}
      </S.CardList>
    </S.Container>
  );
}
