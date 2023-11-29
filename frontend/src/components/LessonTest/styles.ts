import styled from "styled-components";
import * as C from "@styles/components";

interface IContainer {
  $isRight: string;
  $isPassed: boolean;
}

export const Container = styled(C.FlexContainer)<IContainer>`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 45px;
  border: 1px solid
    ${(props) =>
      props.$isPassed
        ? props.$isRight === "testFailed"
          ? props.theme.colors.yRed
          : props.$isRight === "notAllAnswers"
          ? props.theme.colors.dark
          : props.theme.colors.mainGreen
        : props.theme.colors.greyF1};
  border-radius: ${(props) => props.theme.utils.br};
  margin-bottom: 30px;
  @media ${(props) => props.theme.media.mobile} {
    padding: 6.25vw;
    border-radius: 17.089px;
  }

  &:last-child {
    margin-bottom: 115px;
    @media ${(props) => props.theme.media.mobile} {
      margin-bottom: 3.125vw;
    }
  }
`;

export const Title = styled(C.Text)`
  margin-bottom: 40px;
  font-size: 25px;
  line-height: 150%;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 4.6875vw;
    font-size: 4.6875vw;
  }
`;

export const Answers = styled(C.FlexContainer)`
  flex-direction: column;
  margin-bottom: 30px;
  row-gap: 20px;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 6.25vw;
    row-gap: 6.25vw;
  }
`;

export const CheckBtn = styled(C.DefaultBtn)`
  align-self: flex-end;
  width: fit-content;
  padding: 19px 30px;
  @media ${(props) => props.theme.media.mobile} {
    align-self: center;
    padding: 0;
    width: 100%;
    min-height: 12.5vw;
    font-weight: 500;
    text-align: center;
    border-radius: 15px;
  }

  &:disabled {
    color: ${(props) => props.theme.colors.grey57};
    background-color: ${(props) => props.theme.colors.grey93};
  }
`;
