import { DndContext, DragEndEvent } from '@dnd-kit/core';
// import * as S from './styles';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { CourseNavLesson } from '@/components/CourseNavLesson';
import { SortableItem } from '@/components/SortableItem';
import { useEffect, useState } from 'react';
import { ILesson } from '@/types/lesson.types';
import { useActions } from '@/hooks/useActions';
import { useSetLessonsPositionsMutation } from '@/store/api/lesson.api';
import { CourseEntities } from '@/types/course.types';
import { setPositionsErrorsHandler } from '@/utils/setPositionsErrorsHandler';

interface ISortableLessonsProps {
  data: Array<ILesson>;
}

interface ILessonWithDrag extends ILesson {
  isDraggable: boolean;
}

export function SortableLessons({ data }: ISortableLessonsProps) {
  const { setLoaderActive } = useActions();
  const [lessons, setLessons] = useState<Array<ILessonWithDrag>>([]);
  const [setPositions] = useSetLessonsPositionsMutation();

  useEffect(() => {
    if (data) {
      const newLessons = data.map((lesson) => ({
        ...lesson,
        isDraggable: false,
      }));
      const newLessonsSorted = newLessons.sort((a, b) => a.position - b.position);
      setLessons(newLessonsSorted);
      return;
    }
    setLessons([]);
  }, [data]);

  const setDraggable = (id: number, isDraggable: boolean) => {
    setLessons((lessons) => {
      const index = lessons.findIndex((lesson) => lesson.id === id);
      lessons[index].isDraggable = isDraggable;
      return [...lessons];
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !over.data.current || !active.data.current) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = lessons.findIndex((lesson) => lesson.id === active.id);
      const newIndex = lessons.findIndex((lesson) => lesson.id === over.id);
      const changedLessons = arrayMove(lessons, oldIndex, newIndex);
      const itemsData = changedLessons.map((lesson, index) => {
        return {
          id: lesson.id,
          position: index,
        };
      });
      setLessons(changedLessons);
      setPositions({
        type: CourseEntities.lesson,
        items: itemsData,
      }).then((res) => {
        const isError = setPositionsErrorsHandler({
          setter: setLessons,
          res,
          arr: changedLessons,
          oldIndex,
          newIndex,
        });
        if (isError) {
          alert('При перемещении Урока произошла ошибка!');
        }
      });
      setLoaderActive(true);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={lessons.map((lesson) => lesson.id)}>
        {lessons.length > 0 &&
          lessons.map((lesson) => (
            <SortableItem
              key={lesson.id}
              id={lesson.id}
              data={lesson}
              isDraggable={lesson.isDraggable}>
              <CourseNavLesson
                key={lesson.id}
                data={lesson}
                setDraggable={() => {
                  setDraggable(lesson.id, true);
                }}
                setNotDraggable={() => {
                  setDraggable(lesson.id, false);
                }}
              />
            </SortableItem>
          ))}
      </SortableContext>
    </DndContext>
  );
}
