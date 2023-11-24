import styled from "styled-components";
import * as C from "@styles/components";
import externalLinkIcon from "@assets/images/external-link.svg";
import arrowLeft from "@assets/images/swiperArrowLeft.svg";

export const BottomContainer = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  @media ${(props) => props.theme.media.mobile} {
    flex-direction: column-reverse;
    align-items: flex-start;
    row-gap: 9.375vw;
  }
`;

export const AllCompetitionsLenght = styled.p`
  margin-bottom: 11px;

  font-size: 15px;
  font-weight: 500;
  line-height: 130%;
  @media ${(props) => props.theme.media.mobile} {
    margin-left: 10.94vw;
    margin-bottom: 9.69vw;

    font-size: 3.75vw;
  }
`;

export const EditorOutputContainer = styled(C.FlexContainer)`
  flex-direction: column;
  margin-bottom: 50px;
`;

export const Link = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 44px;
  padding: 0 20px 0 23px;
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    min-height: 12.5vw;
  }
`;

export const LinkIcon = styled(C.Icon)`
  margin-left: 10px;
  background-image: url(${externalLinkIcon});
`;

export const ContainerBtn = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 107%;
  right: 0;
  justify-content: space-between;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;

export const BtnLeft = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${arrowLeft});
  background-size: contain;
`;

export const BtnRight = styled(BtnLeft)`
  transform: rotate(-180deg);
`;
