import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
`;

export const Title = styled(C.Text)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  align-self: flex-end;
  margin-bottom: 10px;
  font-size: 15px;
`;

export const ContentWrapper = styled(C.FlexContainer)``;

export const Categories = styled(C.FlexContainer)`
  flex-direction: column;
  row-gap: 22px;
  width: 25%;
`;

export const News = styled(C.FlexContainer)`
  width: 75%;
  flex-direction: column;
  row-gap: 10px;
`;
