import { Steps } from '@/constants';
import * as S from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

interface INavBarProps {
  activeStep: Steps;
}

export function NavBar({ activeStep }: INavBarProps) {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (activeStep === Steps.theme) {
      navigate(`/courses/${courseId}/${chapterId}`);
    }
  }, [activeStep, chapterId, courseId, navigate]);

  return (
    <S.NavList>
      <S.Chapter
        $isActive={activeStep === Steps.chapter}
        onClick={handleClick}>
        Глава
      </S.Chapter>
      {activeStep === Steps.theme && (
        <>
          <S.ArrowIcon />
          <S.Theme>Тема</S.Theme>
        </>
      )}
    </S.NavList>
  );
}
