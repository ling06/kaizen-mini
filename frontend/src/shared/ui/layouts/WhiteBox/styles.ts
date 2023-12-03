import styled, { RuleSet } from 'styled-components';

export const WhiteBox = styled.div<{ $styles?: RuleSet<object> }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 980px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;
