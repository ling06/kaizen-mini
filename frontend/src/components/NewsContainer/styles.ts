import styled from "styled-components";
import * as C from "@styles/components";

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
`;

export const Title = styled(C.Text)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  align-self: flex-end;
  margin-bottom: 10px;
  font-size: 15px;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;


export const ContentWrapper = styled(C.FlexContainer)``;

export const News = styled(C.FlexContainer)`
  position: relative;
  width: 75%;
  min-height: 150px;
  flex-direction: column;
  row-gap: 10px;
  @media ${(props) => props.theme.media.desktop} {
    border-radius: ${(props) => props.theme.utils.br};
  }

  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;
