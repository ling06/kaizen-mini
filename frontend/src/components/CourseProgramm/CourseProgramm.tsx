import { ADMIN_BTN_TYPES, MODAL_TYPES, USER_ROLES } from '@/constants';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseProgrammCard } from './CourseProgrammCard';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useGetCourseByIdQuery } from '@/store/api/course.api';
import { useState, useEffect } from 'react';
import { IChapter } from '@/types/chapter.types';
import { selectUser } from '@/store/api/user.api';

export function CourseProgramm() {
  const { setModalOpen, setModalType } = useActions();
  const courseId = useTypedSelector((state) => state.course.activeCourseId);
  const role = useTypedSelector((state) => selectUser(state).data?.user.role);
  const { data, isFetching } = useGetCourseByIdQuery(Number(courseId), {
    skip: courseId ? false : true,
  });
  const [chaptersData, setChaptersData] = useState<Array<IChapter>>([]);

  console.log(isFetching, data);

  useEffect(() => {
      setChaptersData([]);
  }, [courseId]);

  useEffect(() => {
    if (data) {
      const chapters = data.data.chapters ? data.data.chapters : [];
      setChaptersData(chapters);
    }
  }, [data]);

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
        {chaptersData.length === 0 && isFetching && (
          <>
            <C.ProgrammCardSkeleton />
            <C.ProgrammCardSkeleton />
            <C.ProgrammCardSkeleton />
            <C.ProgrammCardSkeleton />
          </>
        )}
        {chaptersData.length > 0 &&
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
