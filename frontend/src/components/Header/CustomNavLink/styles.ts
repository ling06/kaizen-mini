import styled from 'styled-components';
import * as C from '@styles/components';

interface ILinkProps {
  $isActive: boolean;
}

export const LinkContent = styled(C.Text)<ILinkProps>`
  display: flex;
  align-items: center;
  /* padding-bottom: 8px; */
  /* font-size: 15px; */
  color: ${(props) => (props.$isActive ? props.theme.colors.dark : props.theme.colors.mainBlue)};

  &:hover {
    text-decoration: underline;
  }
`;

export const Icon = styled(C.SvgIcon)<ILinkProps>`
  margin-right: 5px;
  path {
    fill: ${(props) => (props.$isActive ? props.theme.colors.mainBlue : props.theme.colors.dark)};
  }
`;
