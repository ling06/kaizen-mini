import styled, { RuleSet } from 'styled-components';

export const Title = styled.h3<{ $styles?: RuleSet<object> }>`
  color: ${props => props.theme.colors.realBlack};
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;
