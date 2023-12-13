import * as S from './styles';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from '@/components/SortableItem';
import { Course } from '../Course';
import { useEffect, useState } from 'react';
import { useSetCoursesPositionsMutation } from '@/store/api/course.api';
import { useActions } from '@/shared/lib/hooks/useActions';
import { setPositionsErrorsHandler } from '@/shared/lib/setPositionsErrorsHandler';
import { ICourse, CourseEntities } from '@/shared/model/types/course.types';

interface ISortableListProps {
  data: Array<ICourse>;
}

interface ICourseWithDrag extends ICourse {
  isDraggable: boolean;
}

export function SortableList({ data }: ISortableListProps) {
  const { setLoaderActive } = useActions();
  const [courses, setCourses] = useState<ICourseWithDrag[]>([]);
  const [setPositions] = useSetCoursesPositionsMutation();

  useEffect(() => {
    const newCourses = data.map((course) => ({ ...course, isDraggable: false }));
    const newCoursesSorted = newCourses.sort((a, b) => a.position - b.position);
    setCourses(newCoursesSorted);
  }, [data]);

  // const itemStyles = {
  //   height: "11.9vw",
  // }

  const grayItem = {
    backgroundColor: '#f1f1f1',
  };
  // const grayItemStyles = Object.assign({}, itemStyles, {backgroundColor: '#f1f1f1'});
  // console.log(grayItemStyles, itemStyles);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !over.data.current || !active.data.current) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = courses.findIndex((course) => course.id === active.id);
      const newIndex = courses.findIndex((course) => course.id === over.id);
      const changedLessons = arrayMove(courses, oldIndex, newIndex);
      const itemsData = changedLessons.map((course, index) => {
        return {
          id: course.id,
          position: index,
        };
      });
      setCourses(changedLessons);
      setPositions({
        type: CourseEntities.course,
        items: itemsData,
      }).then((res) => {
        const isError = setPositionsErrorsHandler({
          setter: setCourses,
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

  const setDraggable = (id: number, isDraggable: boolean) => {
    setCourses((lessons) => {
      const index = lessons.findIndex((lesson) => lesson.id === id);
      lessons[index].isDraggable = isDraggable;
      return [...lessons];
    });
  };

  return (
    <S.List>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={courses.map((course) => course.id)}>
          {courses.map((course, index) => (
            <SortableItem
              styles={index % 2 !== 0 ? grayItem : {}}
              key={course.id}
              id={course.id}
              isDraggable={course.isDraggable}>
              <Course
                data={course}
                setDraggable={() => {
                  setDraggable(course.id, true);
                }}
                setNotDraggable={() => {
                  setDraggable(course.id, false);
                }}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </S.List>
  );
}
