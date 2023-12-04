import { useAphorism } from '@/shared/hooks/useAphorism';
import * as S from './styles';

export function Aphorism() {
  const { text, author } = useAphorism();
  return (
    <S.Container>
      <S.Title>Фраза дня</S.Title>
      <S.Aphorism>{text}</S.Aphorism>
      <S.Author>{author}</S.Author>
    </S.Container>
  );
}
