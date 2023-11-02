import styled from 'styled-components';
import * as C from '@styles/components';

interface ILinkProps {
  $isActive: boolean;
}

export const LinkContent = styled(C.Text)<ILinkProps>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 15px 0;
  color: ${(props) => (props.$isActive ? props.theme.colors.dark : props.theme.colors.mainBlue)};
  border-bottom: ${props => props.$isActive ? `4px solid ${props.theme.colors.mainBlue}` : 'none'};
  transition: color .2s ease-in-out;

  &:hover {
    color: ${props => props.theme.colors.dark};
  }
`;

export const Icon = styled(C.SvgIcon)<ILinkProps>`
  margin-right: 5px;
  path {
    fill: ${(props) => (props.$isActive ? props.theme.colors.mainBlue : props.theme.colors.dark)};
  }
`;
