import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  padding: 40px 45px;
  border: 1px solid ${(props) => props.theme.colors.greyF1};
  border-radius: ${(props) => props.theme.utils.br};
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 115px;
  }
`;

export const Title = styled(C.Text)`
  margin-bottom: 40px;
  font-size: 25px;
  line-height: 150%;
`;

export const Answers = styled(C.FlexContainer)`
  flex-direction: column;
  margin-bottom: 30px;
`;

export const CheckBtn = styled(C.DefaultBtn)`
  align-self: flex-end;
  width: fit-content;
  padding: 19px 30px;

  &:disabled {
    color: ${(props) => props.theme.colors.grey57};
    background-color: ${(props) => props.theme.colors.grey93};
  }
`;
