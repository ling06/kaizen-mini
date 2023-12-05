import { RuleSet, styled } from 'styled-components';

interface ILayout {
  $width?: string;
  $backgroundColor?: string;
  $styles?: RuleSet<object>;
}

export const Layout = styled.div<ILayout>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;
