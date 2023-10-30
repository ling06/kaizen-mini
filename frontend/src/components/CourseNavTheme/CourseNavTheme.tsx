import { AdminBtn } from '../AdminBtn';
import { CourseNavLesson } from '../CourseNavLesson';
import { DndBtn } from '../DndBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ITheme } from '@/types/theme.types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useActions } from '@/hooks/useActions';
import { useMemo } from 'react';
import { useDeleteThemeMutation, useRestoreThemeMutation } from '@/store/api/theme.api';

interface ICourseNavTheme {
  data: ITheme;
  courseId: number;
}

export function CourseNavTheme({ data, courseId }: ICourseNavTheme) {
  const { setActiveTheme, setModalOpen, setModalType, setUpdatingThemeData, setLoaderActive } =
    useActions();
  const [deleteTheme] = useDeleteThemeMutation();
  const [restoreTheme] = useRestoreThemeMutation();
  const navigate = useNavigate();
  const { themeId } = useParams();

  const isThemeChecked = useMemo(() => {
    if (data.lessons && data.lessons.length > 0) {
      const uncheckedLessons = data.lessons.filter((lesson) => lesson.isChecked !== true);
      return uncheckedLessons.length === 0;
    }

    return false;
  }, [data.lessons]);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setActiveTheme(data);
    const themePath = generatePath(
      `/courses/:courseId/:chapterId/${isExpanded ? ':themeId' : ''}`,
      {
        courseId: String(courseId),
        chapterId: String(data.chapter_id),
        themeId: panel ? String(panel) : '',
      }
    );
    navigate(themePath);
  };

  const handleAddLesson = () => {
    const createLessonPath = generatePath(`/courses/:courseId/:chapterId/:themeId/create-lesson/`, {
      courseId: String(courseId),
      chapterId: String(data.chapter_id),
      themeId: String(data.id),
    });
    navigate(createLessonPath);
  };

  const handleEditTheme = () => {
    setUpdatingThemeData(data);
    setModalType('editTheme');
    setModalOpen(true);
  };

  const handleDeleteTheme = () => {
    deleteTheme({
      id: data.id,
    });
    setLoaderActive(true);
  };

  const handleRestoreTheme = () => {
    restoreTheme({
      id: data.id,
    });
    setLoaderActive(true);
  };

  return (
    <S.Container $isDeleted={!!data.is_deleted}>
      <S.Theme>
        <Accordion
          sx={{ width: '100%', boxShadow: 'unset' }}
          expanded={Number(themeId) === data.id}
          onChange={handleChange(data.id)}>
          <AccordionSummary
            sx={{ padding: 0 }}
            expandIcon={<div style={{ display: 'none' }}></div>}
            aria-controls={`${data.id}_content`}
            id={`${data.id}_header`}
            onClick={(event) => {console.log(1111);
            }}
            >
            <S.AccSum>
              <DndBtn
                onClick={() => {}}
                styles={{ marginRight: '20px' }}
              />
              <C.AccordionIcon $active={Number(themeId) === data.id} />
              <C.CourseNavText
                $active={!isThemeChecked}
                $isDeleted={!!data.is_deleted}>
                {data.title}
              </C.CourseNavText>
              {isThemeChecked && <C.DoneIcon />}
              <AdminBtn
                popupName="Тема"
                styles={{ marginLeft: 'auto' }}
                type={'edit'}
                onClick={() => {}}
                popupHandlers={{
                  onAdd: handleAddLesson,
                  onEdit: handleEditTheme,
                  onDelete: handleDeleteTheme,
                  onRestore: handleRestoreTheme
                }}
              />
            </S.AccSum>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: '102px', paddingRight: 0 }}>
            {data.lessons &&
              data.lessons.map((lesson) => (
                <CourseNavLesson
                  key={lesson.id}
                  data={lesson}
                />
              ))}
          </AccordionDetails>
        </Accordion>
      </S.Theme>
    </S.Container>
  );
}
