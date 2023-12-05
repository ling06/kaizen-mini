import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import wrongAnswer from '@assets/images/wrongAnswer.svg';
import rightAnswer from '@assets/images/rightAnswer.svg';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  row-gap: 15px;
  @media ${(props) => props.theme.media.mobile} {
    row-gap: unset;
  }
  
  &:not(:last-child) {
    margin-bottom: 40px;
    @media ${(props) => props.theme.media.mobile} {
      margin-bottom: 6.25vw;
    }
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
  @media ${(props) => props.theme.media.mobile} {
    padding-left: 9.6875vw;
    background-size: 7.5vw;
  }
`;

export const Comment = styled(C.Text)<IAnswerStyled>`
  font-weight: 600;
  color: ${(props) => (props.$isRight ? props.theme.colors.mainGreen : props.theme.colors.yRed)};
`;
