import { styled } from "styled-components";
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  height: 100vh;
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
  width: calc(100% - 33.25%);
  padding: 20px 35px 80px;
`;
