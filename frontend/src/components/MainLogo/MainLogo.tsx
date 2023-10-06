import * as S from './styles';
import mainLogo from '@assets/images/mainLogo.svg';

export interface IMainLogoProps {
  $styles?: string;
}

export function MainLogo({ $styles }: IMainLogoProps) {
  return (
    <S.MainLogo
      $styles={$styles}
      src={mainLogo}
    />
  );
}
