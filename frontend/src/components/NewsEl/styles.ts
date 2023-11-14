import styled from "styled-components";
import * as C from "@styles/components";

export const Container = styled.div<{
  $isDeleted: boolean;
  $isVisible: boolean;
}>`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px 15px;
  border-radius: ${(props) => props.theme.utils.br};
  opacity: ${(props) => (props.$isVisible ? 1 : 0.5)};
  background-color: ${(props) =>
    props.$isDeleted ? "rgba(224, 54, 56, .1)" : props.theme.colors.realWhite};
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }

  @media ${(props) => props.theme.media.mobile} {
    padding: 2.5vw 3.125vw;
  }
`;

export const Title = styled.h3`
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 700;
  line-height: 149.5%;
  color: ${(props) => props.theme.colors.mainBlue};
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 4.38vw;

    font-size: 3.75vw;
  }
`;

export const Image = styled.img`
  display: block;
  margin-bottom: 20px;
  border-radius: ${(props) => props.theme.utils.br};
  width: 100%;
  object-fit: cover;
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    height: auto;
    margin-bottom: 2.5vw;
  }
`;

export const Footer = styled(C.FlexContainer)`
  align-items: center;
  margin-top: 18px;
  @media ${(props) => props.theme.media.mobile} { 
    margin-right: auto;
  }
`;

export const MoreBtn = styled(C.DefaultBtn)`
  min-height: 44px;
  padding: 0 20%;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: ${(props) => props.theme.utils.br};
`;
