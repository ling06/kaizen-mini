import styled from "styled-components";
import * as C from "@styles/components";
import dropMenuIcon from "@assets/images/caret-up-mob-news.svg";

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

export const dropMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const dropMenuImg = styled(C.Icon)`
  background-image: url(${dropMenuIcon});
`;

export const filterPopup = styled.div``;

export const titleFilter = styled.p`
  color: ${(props) => props.theme.colors.mainBlue};
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 700;
  line-height: 149.5%;
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
