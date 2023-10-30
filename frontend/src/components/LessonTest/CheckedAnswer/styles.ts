import styled from 'styled-components';
import * as C from '@styles/components';
import wrongAnswer from '@assets/images/wrongAnswer.svg';
import rightAnswer from '@assets/images/rightAnswer.svg';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  row-gap: 15px;
  
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

interface IAnswerStyled {
  $isRight: boolean;
}

export const Answer = styled(C.Text)<IAnswerStyled>`
  padding-left: 56px;
  font-weight: 400;
  color: ${(props) => (props.$isRight ? props.theme.colors.mainGreen : props.theme.colors.yRed)};
  background-image: url(${(props) => (props.$isRight ? rightAnswer : wrongAnswer)});
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 36px;
`;

export const Comment = styled(C.Text)<IAnswerStyled>`
  font-weight: 600;
  color: ${(props) => (props.$isRight ? props.theme.colors.mainGreen : props.theme.colors.yRed)};
`;
