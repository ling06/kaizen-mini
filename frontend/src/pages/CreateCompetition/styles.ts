import { createGlobalStyle } from 'styled-components';

export const ChangeBodyBg = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.realWhite} !important;
  }
`;
