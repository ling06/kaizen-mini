import { styled } from 'styled-components';

interface ILayout {
  $width?: string;
  $backgroundColor?: string;
}

export const Layout = styled.div<ILayout>`
  width: ${props => props.$width ? props.$width : '100%'};
  /* max-width: 1920px; */
  margin: 0 auto;
  /* overflow-x: hidden; */
`;
