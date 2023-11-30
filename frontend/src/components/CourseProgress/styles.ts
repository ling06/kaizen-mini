import styled, { RuleSet } from 'styled-components';

interface IProgress {
  $isStarted: boolean;
  $styles?: RuleSet<object>;
  $isHidden?: boolean;
}

export const Progress = styled.div<IProgress>`
  padding: 3px 15px;
  font-weight: 700;
  font-size: 24.923px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realWhite};
  background-color: ${(props) => {
    let color = props.theme.colors.dark;
    if(props.$isStarted) {
      color = props.theme.colors.mainBlue;
    }
    if(props.$isHidden) {
      color = props.theme.colors.grey93;
    }
    return color
  }};
  border-radius: 18px;


  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;

