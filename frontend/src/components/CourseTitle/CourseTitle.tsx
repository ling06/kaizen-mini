import { RuleSet } from 'styled-components';
import * as S from './styles';

interface ICourseTitleProps {
  isDeleted?: boolean;
  isSelected?: boolean;
  isHidden?: boolean;
  title: string;
  styles?: RuleSet<object>;
}

export function CourseTitle({ isDeleted, isSelected, isHidden, title, styles }: ICourseTitleProps) {
  return (
    <S.Title
      $isDeleted={isDeleted}
      $isSelected={isSelected}
      $isHidden={isHidden}
      $styles={styles}>
      {title}
    </S.Title>
  );
}
