import styled, { RuleSet } from 'styled-components';

export const Button = styled.button<{$styles?: RuleSet<object>}>`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;

export const Text = styled.span`
  text-align: center;
  font-size: 17.25px;
  font-weight: 700;
  line-height: 133%; 
  letter-spacing: -0.276px;
  color: ${(props) => props.theme.colors.mainBlue};
`;
