import styled from 'styled-components';
import * as C from '@styles/components';


export const Container = styled(C.FlexContainer)`
  flex-direction: column; 
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

export const VariantInput = styled(C.InputWithState)`
  margin-bottom: 20px;
`;

