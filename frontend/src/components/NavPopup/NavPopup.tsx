import { useNavigate, useParams } from 'react-router-dom';
import { Head } from './Head';
import * as S from './styles';
import { useCallback, useEffect, useState } from 'react';
import { Steps } from '@/constants';
import { IChapter } from '@/types/chapter.types';
import { useActions } from '@/hooks/useActions';
import { CourseNavHead } from '../CourseNavHead';
import { FadedTitle } from '../FadedTitle';
import { ITheme } from '@/types/theme.types';
import { ILesson } from '@/types/lesson.types';
import { CourseNavItemTitle } from '../CourseNavItemTitle';
import { DoneIcon } from '../DoneIcon';
// import { DoneIcon } from '../DoneIcon';

interface INavPopupProps {
  chapterData: IChapter;
}

export function NavPopup({ chapterData }: INavPopupProps) {
  const { themeId, lessonId } = useParams();
  const [activeStep, setActiveStep] = useState(Steps.chapter);
  const { setNavPopup } = useActions();
  const navigate = useNavigate();
  const [navListData, setNavListData] = useState<Array<ITheme> | Array<ILesson>>([]);

  useEffect(() => {
    themeId ? setActiveStep(Steps.theme) : setActiveStep(Steps.chapter);
  }, [themeId]);

  const handleClose = useCallback(() => {
    if (themeId && lessonId) {
      setNavPopup(false);
    } else {
      navigate(`/courses/${chapterData.course_id}`);
    }
  }, [chapterData.course_id, lessonId, navigate, setNavPopup, themeId]);

  useEffect(() => {
    if (activeStep === Steps.chapter) {
      const data = chapterData.themes || [];
      setNavListData(data);
      return;
    }
    if (activeStep === Steps.theme && chapterData.themes) {
      const currentTheme = chapterData.themes.find((theme) => Number(theme.id) === Number(themeId));
      if (currentTheme) {
        const data = currentTheme.lessons || [];
        setNavListData(data);
        return;
      }
    }
  }, [activeStep, chapterData.themes, themeId]);

  const handleClick = (id: number | string) => {
    let url = '';
    if (activeStep === Steps.theme) {
      url = `/courses/${chapterData.course_id}/${chapterData.id}/${themeId}/${id}`;
    } else {
      url = `/courses/${chapterData.course_id}/${chapterData.id}/${id}`;
    }
    navigate(url);
    if (activeStep === Steps.theme) {
      setNavPopup(false);
    }
  };

  return (
    <S.Container>
      <Head
        activeStep={activeStep}
        onClose={handleClose}
      />
      <S.MainContent>
        <CourseNavHead data={chapterData} />
        <FadedTitle
          text={activeStep === Steps.chapter ? 'Темы главы' : 'Уроки'}
          styles={{
            marginBottom: '3.125vw',
            minHeight: '7.5vw',
          }}
        />
        <S.NavList>
          {navListData &&
            navListData.length > 0 &&
            navListData.map((item) => (
              <S.NavListItem
                key={item.id}
                onClick={() => handleClick(item.id)}>
                <CourseNavItemTitle
                  text={item.title}
                  isDeleted={!!item.is_deleted}
                />
                {'isChecked' in item && (
                  <DoneIcon />
                )}
              </S.NavListItem>
            ))}
        </S.NavList>
      </S.MainContent>
    </S.Container>
  );
}
