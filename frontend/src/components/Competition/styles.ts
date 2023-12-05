import styled from "styled-components";
import * as C from "@/shared/ui/assets/styles/components";

export const Container = styled.div<{
  $isDeleted: boolean;
  $isVisible: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0.5)};
  background-color: ${(props) =>
    props.$isDeleted ? "rgba(224, 54, 56, .1)" : props.theme.colors.realWhite};
  transition: opacity 0.2s ease-in-out;
  border-radius: ${(props) => props.theme.utils.br};
  &:hover {
    opacity: 1;
  }
  @media ${(props) => props.theme.media.mobile} {
    padding: 4.38vw 4.38vw 4.7vw;
    min-height: 42.81vw;
    background-color: #fff;
    opacity: 1;
    transition: unset;
  }
`;

export const Head = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 2.5vw;
  }
`;

export const CompetitionPagination = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 130%;
  color: ${(props) => props.theme.colors.realBlack};

  @media ${(props) => props.theme.media.mobile} {
    font-size: 4.7vw;
  }
`;

export const CompetitionTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 700;
  line-height: 145.5%;
  color: ${(props) => props.theme.colors.realBlack};

  @media ${(props) => props.theme.media.mobile} {
    font-size: 3.75vw;
    line-height: 140%;
  }
`;

export const CompetitionDescr = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 170%;
  color: ${(props) => props.theme.colors.realBlack};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;

export const MoreBtn = styled(C.DefaultBtn)`
  width: fit-content;
  margin: auto auto 0;
  padding: 0 40px;
  border-radius: 22.689px;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;
