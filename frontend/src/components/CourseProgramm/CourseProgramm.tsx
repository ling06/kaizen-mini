import { ADMIN_BTN_TYPES, MODAL_TYPES, USER_ROLES } from '@/constants';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { CourseProgrammCard } from './CourseProgrammCard';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import { useEffect, useState } from 'react';
import { IChapter } from '@/types/chapter.types';

export function CourseProgramm() {
  const { setModalOpen, setModalType } = useActions();
  const courseChapters = useTypedSelector((state) => state.course.data?.chapters);
  const role = useTypedSelector((state) => selectUser(state).data?.user.role);
  const [chaptersData, setChaptersData] = useState<Array<IChapter>>();

  useEffect(() => {
    if(courseChapters && courseChapters) {
      setChaptersData(courseChapters);
    } else {
      setChaptersData([]);
    }
  }, [courseChapters])

  const openCreateChapterModal = () => {
    setModalType(MODAL_TYPES.createChapter);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Head>
        <S.Title as={'h4'}>Программа курса</S.Title>
        <AdminBtn
          type={ADMIN_BTN_TYPES.add}
          onClick={openCreateChapterModal}
        />
      </S.Head>
      <S.CardList>
        {chaptersData &&
          chaptersData.length > 0 &&
          chaptersData.map((chapter) => {
            if (!chapter.is_deleted || role === USER_ROLES.admin) {
              return (
                <CourseProgrammCard
                  data={chapter}
                  key={chapter.id}
                />
              );
            }
          })}
      </S.CardList>
    </S.Container>
  );
}
