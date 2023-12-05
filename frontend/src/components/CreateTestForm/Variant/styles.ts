import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  margin-bottom: 15px;
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

export const VariantInput = styled(C.InputWithState)`
  margin-bottom: 20px;
`;

export const RadioGroup = styled(C.FlexContainer)`
  align-items: center;
  margin-bottom: 20px;
`;

interface ICommentInput {
  $isRight: boolean;
}

export const CommentInput = styled(C.Input)<ICommentInput>`
  color: ${(props) => (props.$isRight ? props.theme.colors.mainGreen : props.theme.colors.yRed)};

  &:focus {
    color: ${(props) => (props.$isRight ? props.theme.colors.mainGreen : props.theme.colors.yRed)}; 
  }
`;
