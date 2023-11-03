import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  max-width: min(1360px, 73%);
  margin: 0 auto;
  width: 100%;
  @media ${props => props.theme.media.mobile} {
    display: none;
  }
`;

export const NavBar = styled.ul`
  display: flex;
  align-items: center;
  gap: 80px;
  height: 1px;
  min-height: 60px;
`;
