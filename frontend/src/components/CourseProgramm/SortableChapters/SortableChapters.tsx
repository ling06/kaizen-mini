import { SortableItem } from '@/components/SortableItem';
import { USER_ROLES } from '@/constants';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { CourseProgrammCard } from '../CourseProgrammCard';
import { IChapter } from '@/types/chapter.types';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import { useEffect, useState } from 'react';
import { useSetChaptersPositionsMutation } from '@/store/api/chapter.api';
import { CourseEntities } from '@/types/course.types';
import { useActions } from '@/hooks/useActions';
// import * as S from './styles';

interface ISortableChaptersProps {
  data: Array<IChapter>;
}

interface IChapterWithDrag extends IChapter {
  isDraggable: boolean;
}

export function SortableChapters({ data }: ISortableChaptersProps) {
  const {setLoaderActive} = useActions();
  const role = useTypedSelector((state) => selectUser(state).data?.user.role);
  const [chapters, setChapters] = useState<Array<IChapterWithDrag>>([]);
  const [setPositions] = useSetChaptersPositionsMutation();

  useEffect(() => {
    if (data) {
      const chaptersWithDrag = data.map((chapter) => {
        return {
          ...chapter,
          isDraggable: false,
        };
      });
      const chaptersSorted = chaptersWithDrag.sort((a, b) => a.position - b.position);
      setChapters(chaptersSorted);
      return;
    }
    setChapters([]);
  }, [data]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !over.data.current || !active.data.current) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id);
      const newIndex = chapters.findIndex((chapter) => chapter.id === over.id);
      const changedChapters = arrayMove(chapters, oldIndex, newIndex);
      const itemsData = changedChapters.map((chapter, index) => {
        return {
          id: chapter.id,
          position: index,
        };
      })
      setChapters([...changedChapters]);
      setPositions({
        type: CourseEntities.chapter,
        items: 0,
      }).then((res) => {
        if('error' in res || 'data' in res && res.data.status !== 'success') {
          const reversedChapters = arrayMove(chapters, newIndex, oldIndex);
          alert('При перемещении главы произошла ошибка!');
          setChapters([...reversedChapters]);
        }
      })
      setLoaderActive(true);
    }
  }

  const setDraggable = (id: number, isDraggable: boolean) => {
    setChapters((chapters) => {
      const index = chapters.findIndex((chapter) => chapter.id === id);
      chapters[index].isDraggable = isDraggable;
      return [...chapters];
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={chapters.map((chapter) => chapter.id)}>
        {chapters.length > 0 &&
          chapters.map((chapter) => {
            if (!chapter.is_deleted || role === USER_ROLES.admin) {
              return (
                <SortableItem
                  key={chapter.id}
                  id={chapter.id}
                  data={chapter}
                  isDraggable={chapter.isDraggable}>
                  <CourseProgrammCard
                    data={chapter}
                    setDraggable={() => {
                      setDraggable(chapter.id, true);
                    }}
                    setNotDraggable={() => {
                      setDraggable(chapter.id, false);
                    }}
                  />
                </SortableItem>
              );
            }
          })}
      </SortableContext>
    </DndContext>
  );
}
