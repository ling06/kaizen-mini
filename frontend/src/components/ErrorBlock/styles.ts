import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  justify-content: center;
  height: 188px;
  border-radius: ${props => props.theme.utils.br};
  background-color: ${props => props.theme.colors.realWhite};
`;

export const Text = styled(C.Text)`
  font-size: 22.714px;
`;
