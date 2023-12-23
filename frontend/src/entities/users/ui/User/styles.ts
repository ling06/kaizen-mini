import styled, { RuleSet } from 'styled-components';

export const Container = styled.div<{ $styles?: RuleSet<object> }>`
  display: flex;
  align-items: center;
  width: 100%;
  column-gap: 23px;
  cursor: pointer;

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;

export const UserName = styled.p<{$bold?: boolean}>`
  color: ${props => props.theme.colors.realBlack};
  font-family: 'Montserrat';
  font-size: 15px;
  font-style: normal;
  font-weight: ${props => props.$bold ? 700 : 400};
  line-height: 120%;
`;
