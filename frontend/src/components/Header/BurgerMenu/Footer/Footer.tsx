import { Aphorism } from '@/components/Aphorism';
import * as S from './styles';
import logoMobile from '@assets/images/logo-mobile.svg';

export function Footer() {
  return (
    <S.Container>
      <Aphorism />
      <S.Bottom>
        <S.Logo
          src={logoMobile}
          alt="Kaizen"
        />
        <S.Copyright>Создано в Ямагучи для Ямагучи (с) 2023</S.Copyright>
      </S.Bottom>
    </S.Container>
  );
}
