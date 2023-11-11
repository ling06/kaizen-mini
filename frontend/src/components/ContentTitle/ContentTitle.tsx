import * as S from './styles';

interface IContentTitleProps {
  title: string
}

export function ContentTitle({ title }: IContentTitleProps) {
  return (
    <S.Title>
      {title}
    </S.Title>
  );
}