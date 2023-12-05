import styled, { RuleSet } from 'styled-components';

export const SmallTitle = styled.h4<{ $styles?: RuleSet<object> }>`
  margin-bottom: 4px;
  font-family: 'Montserrat';
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.grey93};

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;
