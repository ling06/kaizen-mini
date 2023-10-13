import { AdminBtn } from '../AdminBtn';
import { CourseNavLesson } from '../CourseNavLesson';
import { DndBtn } from '../DndBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ITheme } from '@/types/theme.types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface ICourseNavTheme {
  data: ITheme;
}

export function CourseNavTheme({ data }: ICourseNavTheme) {
  const courseId = useTypedSelector((state) => state.course.id);
  const { setActiveTheme } = useActions();
  const navigate = useNavigate();
  const location = useLocation();
  const { themeId } = useParams();

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setActiveTheme(data);
    const themePath = generatePath(`/courses/:courseId/:chapterId/${isExpanded ? ':themeId' : ''}`, {
      courseId: String(courseId),
      chapterId: String(data.chapter_id),
      themeId: panel ? String(panel) : '',
    });
    navigate(themePath);
  };

  const addLesson = () => {
    navigate(location.pathname + `${data.id}/create-lesson`);
  };

  return (
    <S.Container>
      <S.Theme>
        <Accordion
          sx={{ width: '100%', boxShadow: 'unset' }}
          expanded={Number(themeId) === data.id}
          onChange={handleChange(data.id)}>
          <AccordionSummary
            expandIcon={<div style={{ display: 'none' }}></div>}
            aria-controls={`${data.id}_content`}
            id={`${data.id}_header`}>
            <S.AccSum>
              <DndBtn
                onClick={() => {}}
                styles={{ marginRight: '20px' }}
              />
              <C.AccordionIcon $active={Number(themeId) === data.id} />
              <C.CourseNavText $active={true}>{data.title}</C.CourseNavText>
              <C.DoneIcon />
              <AdminBtn
                type={'edit'}
                onClick={() => {}}
                popupHandlers={{ onAdd: addLesson }}
              />
            </S.AccSum>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: '120px' }}>
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
