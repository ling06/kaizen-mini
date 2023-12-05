import { CourseNavTheme } from '@/components/CourseNavTheme';
import { SortableItem } from '@/components/SortableItem';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
// import * as S from './styles';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { useSetThemesPositionsMutation } from '@/store/api/theme.api';
import { selectUser } from '@/store/api/user.api';
import { ITheme } from '@/shared/model/types/theme.types';
import { useState, useEffect } from 'react';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useParams } from 'react-router-dom';
import { CourseEntities } from '@/shared/model/types/course.types';
import { setPositionsErrorsHandler } from '@/shared/lib/setPositionsErrorsHandler';

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
  const { courseId } = useParams();
  const [setPositions] = useSetThemesPositionsMutation();

  useEffect(() => {
    if (data) {
      const themesData = data.map((theme) => {
        return {
          ...theme,
          isDraggable: false,
        };
      });
      const themesDataSorted = themesData.sort((a, b) => a.position - b.position);

      setThemes(themesDataSorted);
      return;
    }
    setThemes([]);
  }, [data]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !over.data.current) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = themes.findIndex((theme) => theme.id === active.id);
      const newIndex = themes.findIndex((theme) => theme.id === over.id);
      const changedThemes = arrayMove(themes, oldIndex, newIndex);
      const itemsData = changedThemes.map((theme, index) => {
        return {
          id: theme.id,
          position: index,
        };
      });
      setThemes(changedThemes);
      setPositions({
        type: CourseEntities.theme,
        items: itemsData,
      }).then((res) => {
        const isError = setPositionsErrorsHandler({
          setter: setThemes,
          res,
          arr: changedThemes,
          oldIndex,
          newIndex,
        });
        if (isError) {
          alert('При перемещении Темы произошла ошибка!');
        }
      });
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
