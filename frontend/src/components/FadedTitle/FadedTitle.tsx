import * as S from './styles';

interface IFadedTitleProps {
  text: string;
  children?: React.ReactNode;
  onClick?: () => void;
  styles?: {
    [key: string]: string;
  };
}

export function FadedTitle({ text, children, onClick = () => {}, styles = {} }: IFadedTitleProps) {
  return (
    <S.Title
      onClick={onClick}
      style={styles}>
      {text}
      {children}
    </S.Title>
  );
}
