import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

interface ILinkProps {
  $isActive: boolean;
}

export const LinkContent = styled(C.Text)<ILinkProps>`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 15px 0;
  color: ${(props) => (props.$isActive ? props.theme.colors.dark : props.theme.colors.mainBlue)};
  transition: color .2s ease-in-out;
  @media ${props => props.theme.media.mobile} {
    padding: 0;
    font-weight: ${props => props.$isActive ? '700' : '600'};
  }

  &:hover {
    color: ${props => props.theme.colors.dark};
  }

  &::before {
    display: ${props => props.$isActive ? 'block' : 'none'};
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    height: 0;
    content: '';
    transform: translateX(-50%);
    background-color: ${props => props.theme.colors.mainBlue};
    animation: elastic .2s ease-in-out forwards;
    @media ${props => props.theme.media.mobile} {
      display: none;
    }
  }

  @keyframes elastic {
    100% {
      height: 4px;
    }
  }
`;

export const Icon = styled(C.SvgIcon)<ILinkProps>`
  margin-right: 5px;
  path {
    fill: ${(props) => (props.$isActive ? props.theme.colors.mainBlue : props.theme.colors.dark)};
  }
`;
