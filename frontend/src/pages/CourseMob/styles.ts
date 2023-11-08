import styled, { createGlobalStyle } from 'styled-components';


export const bodyOverflow = createGlobalStyle`
  body {
    overflow: hidden;
    background-color: ${props => props.theme.colors.realWhite};
  }
`;
