import * as S from './styles';

interface ICourseTitleProps {
  isDeleted?: boolean;
  isSelected?: boolean;
  isHidden?: boolean;
  title: string;
  //TODO: исправить тип
  styles?: string;
}

export function CourseTitle({ isDeleted, isSelected, isHidden, title, styles }: ICourseTitleProps) {
  return (
    <S.Title $isDeleted={isDeleted} $isSelected={isSelected} $isHidden={isHidden}>
      {title}
    </S.Title>
  );
}
