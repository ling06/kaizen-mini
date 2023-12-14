import { SortableItem } from '@/components/SortableItem';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { CourseProgrammCard } from '../CourseProgrammCard';
import { IChapter } from '@/shared/model/types/chapter.types';
import { useEffect, useState } from 'react';
import { useSetChaptersPositionsMutation } from '@/store/api/chapter.api';
import { CourseEntities } from '@/shared/model/types/course.types';
import { useActions } from '@/shared/lib/hooks/useActions';
import { setPositionsErrorsHandler } from '@/shared/lib/setPositionsErrorsHandler';

interface ISortableChaptersProps {
  data: Array<IChapter>;
}

interface IChapterWithDrag extends IChapter {
  isDraggable: boolean;
}

export function SortableChapters({ data }: ISortableChaptersProps) {
  const { setLoaderActive } = useActions();
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
      });
      setChapters(changedChapters);
      setPositions({
        type: CourseEntities.chapter,
        items: itemsData,
      }).then((res) => {
        const isError = setPositionsErrorsHandler({
          setter: setChapters,
          res,
          arr: changedChapters,
          oldIndex,
          newIndex,
        });
        if (isError) {
          alert('При перемещении Главы произошла ошибка!');
        }
      });
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
          )}
      </SortableContext>
    </DndContext>
  );
}
