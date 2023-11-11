import * as S from './styles';

interface ICourseBreadcrumbProps {
  chapter: {
    name: string;
    position: number;
    allQuantity: number;
  };
  theme: {
    name: string;
    position: number;
    allQuantity: number;
  };
  lesson: {
    name: string;
    position: number;
    allQuantity: number;
  };
  containerStyles?: {[key: string]: string};
}

export function CourseBreadcrumb({ chapter, theme, lesson, containerStyles }: ICourseBreadcrumbProps) {
  return (
    <S.Container style={containerStyles}>
      <S.Chapter>Глава {chapter.position}/{chapter.allQuantity}</S.Chapter>
      <S.Arrow />
      <S.Theme>Тема {theme.position}/{theme.allQuantity}: {theme.name}</S.Theme>
      <S.Arrow />
      <S.Lesson>Урок {lesson.position}/{lesson.allQuantity}</S.Lesson>
    </S.Container>
  );
}
