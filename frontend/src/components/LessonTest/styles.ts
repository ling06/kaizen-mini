import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  padding: 40px 45px;
  border: 1px solid ${(props) => props.theme.colors.greyF1}; 
  border-radius: ${props => props.theme.utils.br};
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


