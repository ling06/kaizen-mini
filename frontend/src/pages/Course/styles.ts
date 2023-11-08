import {styled, createGlobalStyle} from "styled-components";
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  height: calc(100vh - 62.25px);
  background-color: ${props => props.theme.colors.realWhite};
`;

export const NavContainer = styled(C.FlexContainer)`
  flex-direction: column;
  width: 33.25%; 
  padding: 15px 15px 80px;
  border-right: 1px solid ${props => props.theme.colors.greyF1};
`;

export const ContentContainer = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
  width: calc(100% - 33.25%);
  max-height: 100vh;
  overflow-y: scroll;
  padding: 20px 35px 80px;
  @media ${props => props.theme.media.mobile} {
    width: 100%;
    padding: 3.125vw 0 10vw;
  }
`;

export const bodyOverflow = createGlobalStyle`
  body {
    overflow: hidden;
    background-color: ${props => props.theme.colors.realWhite};
  }
`;
