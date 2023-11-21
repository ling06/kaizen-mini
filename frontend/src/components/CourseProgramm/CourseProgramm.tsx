import { ADMIN_BTN_TYPES, MODAL_TYPES, USER_ROLES } from '@/constants';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { CourseProgrammCard } from './CourseProgrammCard';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
// import { useEffect, useState } from 'react';
// import { IChapter } from '@/types/chapter.types';
// import { DndContext } from '@dnd-kit/core';
// import { SortableContext } from '@dnd-kit/sortable';
// import { SortableItem } from '../SortableItem';

export function CourseProgramm() {
  const { setModalOpen, setModalType } = useActions();
  const chaptersData = useTypedSelector((state) => state.course.data?.chapters);
  const role = useTypedSelector((state) => selectUser(state).data?.user.role);

  const openCreateChapterModal = () => {
    setModalType(MODAL_TYPES.createChapter);
    setModalOpen(true);
  };

  // function handleDragEnd(event) {
  //   const {active, over} = event;
    
  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);
        
  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }

  return (
    <S.Container>
      <S.Head>
        <S.Title as={'h4'}>Программа курса</S.Title>
        <AdminBtn
          popupName="Глава"
          type={ADMIN_BTN_TYPES.add}
          onClick={openCreateChapterModal}
        />
      </S.Head>
      <S.CardList>
        {/* <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={chaptersData}> */}
            {chaptersData &&
              chaptersData.length > 0 &&
              chaptersData.map((chapter) => {
                if (!chapter.is_deleted || role === USER_ROLES.admin) {
                  return (
                    // <SortableItem
                      // key={chapter.id}
                      // id={chapter.id}>
                      <CourseProgrammCard data={chapter} />
                    // </SortableItem>
                  );
                }
              })}
          {/* </SortableContext>
        </DndContext> */}
      </S.CardList>
    </S.Container>
  );
}
