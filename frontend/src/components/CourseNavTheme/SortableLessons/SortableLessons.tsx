import { DndContext, DragEndEvent } from '@dnd-kit/core';
// import * as S from './styles';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { CourseNavLesson } from '@/components/CourseNavLesson';
import { SortableItem } from '@/components/SortableItem';
import { useEffect, useState } from 'react';
import { ILesson } from '@/types/lesson.types';
import { useUpdateLessonMutation } from '@/store/api/lesson.api';
import { useActions } from '@/hooks/useActions';

interface ISortableLessonsProps {
  data: Array<ILesson>;
}

interface ILessonWithDrag extends ILesson {
  isDraggable: boolean;
}

export function SortableLessons({ data }: ISortableLessonsProps) {
  const { setLoaderActive } = useActions();
  const [lessons, setLessons] = useState<Array<ILessonWithDrag>>([]);
  const [updateLesson] = useUpdateLessonMutation();

  useEffect(() => {
    if(data) {
      const newLessons = data.map((lesson) => ({
        ...lesson,
        isDraggable: false,
      }));
      const newLessonsSorted = newLessons.sort(
        (a, b) => a.position - b.position);
      setLessons(newLessonsSorted);
      return;
    }
    setLessons([]);
  }, [data]);

  const setDraggable = (id: number, isDraggable: boolean) => {
    setLessons((lessons) => {
      const index = lessons.findIndex((theme) => theme.id === id);
      lessons[index].isDraggable = isDraggable;
      return [...lessons];
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if(!over || !over.data.current) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = lessons.findIndex((lesson) => lesson.id === active.id);
      const newIndex = lessons.findIndex((lesson) => lesson.id === over.id);

      updateLesson({
        ...active.data.current as ILesson,
        position: over.data.current.position as number,
      }).then((res) => {
        if ('error' in res || 'data' in res && !res.data.result) {
          alert('При перемещении урока произошла ошибка');
        }
      });
      const changedThemes = arrayMove(lessons, oldIndex, newIndex);
      setLessons(changedThemes);
      setLoaderActive(true);
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={lessons.map((lesson) => lesson.id)}>
        {lessons.length > 0 &&
          lessons.map((lesson) => (
            <SortableItem key={lesson.id} id={lesson.id} data={lesson}>
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
