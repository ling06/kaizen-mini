import * as S from './styles';

interface ICourseNavItemTitleProps {
  text: string;
  isActive?: boolean;
  isDeleted?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  styles?: {
    [key: string]: string;
  };
}

export function CourseNavItemTitle({
  text = '',
  children,
  onClick = () => {},
  styles = {},
  isActive = true,
  isDeleted = false,
}: ICourseNavItemTitleProps) {
  return (
    <S.Title
      style={styles}
      onClick={onClick}
      $active={isActive}
      $isDeleted={isDeleted}>
      {text}
      {children}
    </S.Title>
  );
}
