import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
`;

export const Title = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  color: ${(props) => props.theme.colors.grey93};
`;


