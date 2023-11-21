import { useActions } from '@/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { CourseNavTheme } from '../CourseNavTheme';
import * as S from './styles';
import { MODAL_TYPES } from '@/constants';
import { IChapter } from '@/types/chapter.types';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import { FadedTitle } from '../FadedTitle';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import { useEffect, useState } from 'react';
import { ITheme } from '@/types/theme.types';
import { useUpdateThemeMutation } from '@/store/api/theme.api';

interface IThemeWithDrag extends ITheme {
  isDraggable: boolean;
}

interface ICourseNavBodyProps {
  data: IChapter;
}
export function CourseNavBody({ data }: ICourseNavBodyProps) {
  const { setModalType, setModalOpen, setLoaderActive } = useActions();
  const userRole = useTypedSelector((state) => selectUser(state).data?.user.role);
  const [themes, setThemes] = useState<Array<IThemeWithDrag>>([]);
  const [updateTheme] = useUpdateThemeMutation();

  useEffect(() => {
    if (data.themes) {
      const themesData = data.themes.map((theme) => {
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
  }, [data.themes]);

  const openCreateThemeModal = () => {
    setModalType(MODAL_TYPES.createTheme);
    setModalOpen(true);
  };

  const setDraggable = (id: number, isDraggable: boolean) => {
    setThemes((themes) => {
      const index = themes.findIndex((theme) => theme.id === id);
      themes[index].isDraggable = isDraggable;
      return [...themes];
    });
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(active);

    if (active.id !== over.id) {
      const oldIndex = themes.findIndex((theme) => theme.id === active.id);
      const newIndex = themes.findIndex((theme) => theme.id === over.id);

      updateTheme({
        id: active.data.current.id,
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

  return (
    <S.Container>
      <FadedTitle text="Темы главы">
        <AdminBtn
          popupName="Тема"
          type={'add'}
          onClick={openCreateThemeModal}
        />
      </FadedTitle>
      <S.Container>
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
                      courseId={data.course_id}
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
      </S.Container>
    </S.Container>
  );
}
