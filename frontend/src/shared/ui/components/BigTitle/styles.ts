import styled, { RuleSet } from 'styled-components';

export const Title = styled.h1<{ $styles?: RuleSet<object> }>`
  color: ${(props) => props.theme.colors.realBlack};
  font-family: 'Montserrat';
  font-size: 24.923px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;
