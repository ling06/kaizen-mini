import {styled, createGlobalStyle} from "styled-components";
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  height: calc(100vh - 62.25px);
  background-color: ${props => props.theme.colors.realWhite};
  @media ${props => props.theme.media.mobile} {
    height: 11.9vw;
  }
`;

export const NavContainer = styled(C.FlexContainer)`
  ${C.ScrollBar};
  flex-direction: column;
  width: 33.25%; 
  padding: 15px 15px 80px;
  border-right: 1px solid ${props => props.theme.colors.greyF1};
`;

export const ContentContainer = styled(C.FlexContainer)`
  ${C.ScrollBar};
  scrollbar-width: 20px;

  flex-direction: column;
  position: relative;
  width: calc(100% - 33.25%);
  max-height: 100vh;
  overflow-y: scroll;
  padding: 20px 35px 80px;
  margin-left: auto;

  @media ${props => props.theme.media.mobile} {
    width: 100%;
    padding: 3.125vw 3% 10vw;
    margin: 0;
    height: auto;
  }
  &::-webkit-scrollbar {
      width: 20px; 
  }

  &::-webkit-scrollbar-thumb {
      border-radius: 15px;
  }
`;

export const bodyOverflow = createGlobalStyle`
  body {
    overflow: hidden;
    background-color: ${props => props.theme.colors.realWhite};
  }
`;
