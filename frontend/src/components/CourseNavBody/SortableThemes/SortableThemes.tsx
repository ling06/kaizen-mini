import { CourseNavTheme } from '@/components/CourseNavTheme';
import { SortableItem } from '@/components/SortableItem';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
// import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useUpdateThemeMutation } from '@/store/api/theme.api';
import { selectUser } from '@/store/api/user.api';
import { ITheme } from '@/types/theme.types';
import { useState, useEffect } from 'react';
import { useActions } from '@/hooks/useActions';
import { useParams } from 'react-router-dom';

interface IThemeWithDrag extends ITheme {
  isDraggable: boolean;
}

interface ISortableThemesProps {
  data: Array<ITheme>;
}

export function SortableThemes({ data }: ISortableThemesProps) {
  const { setLoaderActive } = useActions();
  const userRole = useTypedSelector((state) => selectUser(state).data?.user.role);
  const [themes, setThemes] = useState<Array<IThemeWithDrag>>([]);
  const [updateTheme] = useUpdateThemeMutation();
  const {courseId} = useParams();

  useEffect(() => {
    if (data) {
      const themesData = data.map((theme) => {
        return {
          ...theme,
          isDraggable: false,
        };
      });
      const themesDataSorted = themesData.sort(
        (a, b) => a.position - b.position);

      setThemes(themesDataSorted);
      return;
    }
    setThemes([]);
  }, [data]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if(!over || !over.data.current) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = themes.findIndex((theme) => theme.id === active.id);
      const newIndex = themes.findIndex((theme) => theme.id === over.id);

      updateTheme({
        ...active.data.current as ITheme,
        position: over.data.current.position,
      }).then((res) => {
        if ('error' in res || 'data' in res && !res.data.result) {
          alert('При перемещении темы произошла ошибка');
        }
      });
      const changedThemes = arrayMove(themes, oldIndex, newIndex);
      setThemes(changedThemes);
      setLoaderActive(true);
    }
  }

  const setDraggable = (id: number, isDraggable: boolean) => {
    setThemes((themes) => {
      const index = themes.findIndex((theme) => theme.id === id);
      themes[index].isDraggable = isDraggable;
      return [...themes];
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
    {themes && (
      <SortableContext items={themes.map((theme) => theme.id)}>
        {themes.map((theme) => {
          if (Number(theme.is_deleted) === 1 && userRole !== 'admin') {
            return;
          }
          return (
            <SortableItem
              key={theme.id}
              id={theme.id}
              isDraggable={theme.isDraggable}
              data={theme}>
              <CourseNavTheme
                data={theme}
                courseId={Number(courseId)}
                key={theme.id}
                setDraggable={() => {
                  setDraggable(theme.id, true);
                }}
                setNotDraggable={() => {
                  setDraggable(theme.id, false);
                }}
              />
            </SortableItem>
          );
        })}
      </SortableContext>
    )}
  </DndContext>
  );
}
