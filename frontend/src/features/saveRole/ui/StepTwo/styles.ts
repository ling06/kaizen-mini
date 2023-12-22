import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 35px;

  &:last-child {
    margin-bottom: 20px;
  }
`;

export const InputName = styled(C.Text)`
  margin-bottom: 15px;
`;

export const Input = styled(C.InputWithState)`
  &:hover:not(:focus) {
    border-color: ${props => props.theme.colors.dark};
    cursor: pointer;
  }
`;

export const ErrorText = styled.p`
  padding-top: 10px;
  font-size: 14px;
  color: ${props => props.theme.colors.yRed};
`;
