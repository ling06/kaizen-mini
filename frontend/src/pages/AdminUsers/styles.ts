import styled from "styled-components";
import * as C from "@styles/components";

export const MainContainer = styled(C.FlexContainer)`
  flex-direction: column;
  max-width: 1266px;
  margin: 0 auto;

  padding: 70px 0 50px 0;
  @media ${(props) => props.theme.media.mobile} {
    padding: 2% 0 15%;
  }
`;

export const Content = styled(C.FlexContainer)`
  width: 100%;
  height: 980px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 30px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
`;

export const SelectorContainer = styled(C.FlexContainer)`
  flex-direction: column;
  margin-bottom: 55px;
`;

export const UsersContainer = styled(C.FlexContainer)`
  flex-wrap: wrap;
  width: 100%;
  gap: 5px 35px;
`;

export const Title = styled(C.AdminTitle)`
  margin-bottom: 25px;

  font-size: 24.923px;
`;
