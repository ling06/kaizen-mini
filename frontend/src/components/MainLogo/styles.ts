import { styled } from 'styled-components';
import { IMainLogoProps } from '.';

export const MainLogo = styled.img<IMainLogoProps>`
  ${(props) => props.$styles}
`;
