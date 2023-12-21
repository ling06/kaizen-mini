import { TextStyles } from '@/shared/ui/assets/styles/base-styles';
import styled from 'styled-components';

export const Text = styled.p`
  ${TextStyles}
  font-weight: 400;
  line-height: 170%;
  color: ${props => props.theme.colors.dark};

  span {
    color: ${props => props.theme.colors.yRed };
  }

  &:last-of-type {
    margin-bottom: 30px;
  }
`;
