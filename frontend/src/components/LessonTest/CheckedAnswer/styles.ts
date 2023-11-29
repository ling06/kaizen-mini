import styled from "styled-components";
import * as C from "@styles/components";
import wrongAnswer from "@assets/images/wrongAnswer.svg";
import rightAnswer from "@assets/images/rightAnswer.svg";
import unspecifiedAnswer from "@assets/images/unspecifiedAnswer.svg";

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  row-gap: 15px;
  @media ${(props) => props.theme.media.mobile} {
    row-gap: unset;
  }

  /* &:not(:last-child) {
    margin-bottom: 40px;
    @media ${(props) => props.theme.media.mobile} {
      margin-bottom: 6.25vw;
    }
  } */
`;

interface IAnswerStyled {
  $isRight: string;
}

export const Answer = styled(C.Text)<IAnswerStyled>`
  padding-left: 56px;
  font-weight: 400;
  color: ${(props) =>
    props.$isRight === "Правильно"
      ? props.theme.colors.mainGreen
      : props.$isRight === "Неуказанный"
      ? props.theme.colors.realBlack
      : props.theme.colors.yRed};
  background-image: url(${(props) =>
    props.$isRight === "Правильно"
      ? rightAnswer
      : props.$isRight === "Неуказанный"
      ? unspecifiedAnswer
      : wrongAnswer});
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 29px;
  @media ${(props) => props.theme.media.mobile} {
    padding-left: 9.6875vw;
    background-size: 7.5vw;
  }
`;

export const Comment = styled(C.Text)<IAnswerStyled>`
  font-weight: 600;
  color: ${(props) =>
    props.$isRight === "Правильно"
      ? props.theme.colors.mainGreen
      : props.$isRight === "Неуказанный"
      ? props.theme.colors.realBlack
      : props.theme.colors.yRed};
`;
