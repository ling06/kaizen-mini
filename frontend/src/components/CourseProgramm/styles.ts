import * as C from '@styles/components';
import styled from 'styled-components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
`;

export const Head = styled(C.FlexContainer)`
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled(C.Text)``;


export const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  gap: 9px;
`;
