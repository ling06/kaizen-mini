import styled, { css } from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import arrowIcon from '@assets/images/grey-arrow-right.svg';

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const NavItem = styled.li`
  padding-bottom: 3.125vw;
  border-bottom: 4px solid ${(props) => props.theme.colors.grey93};
  margin-right: 3.125vw;
  font-size: 4.6875vw;
  font-weight: 500;
  line-height: 130%;
  color: #000;
`;

export const Chapter = styled(NavItem)<{ $isActive: boolean }>`
  ${(props) => {
    if (!props.$isActive) {
      return css`
        color: ${(props) => props.theme.colors.grey93};
        border-bottom: none;
      `;
    }
  }}
`;

export const ArrowIcon = styled(C.Icon)`
  margin-right: 3.125vw;
  background-image: url(${arrowIcon});
`;

export const Theme = styled(NavItem)`
  color: ${(props) => props.theme.colors.dark};
  border-color: ${(props) => props.theme.colors.dark};
`;
