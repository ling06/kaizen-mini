import { Course } from '../Course';
import { Header } from './Header';
import * as S from './styles';

export function CourseMob() {
  return (
    <>
      <S.bodyOverflow />
      <Header />
      <Course />
    </>
  );
}
