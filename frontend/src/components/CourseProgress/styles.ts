import styled, { RuleSet, css } from 'styled-components';
import doneIcon from '@assets/images/done-white.svg';

interface IProgress {
  $isStarted: boolean;
  $styles?: RuleSet<object>;
  $isHidden?: boolean;
  $progress?: number;
}

export const Progress = styled.div<IProgress>`
  padding: 3px 15px;
  font-weight: 700;
  font-size: 24.923px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realWhite};
  background-color: ${(props) => {
    let color = props.theme.colors.dark;
    if (props.theme.media.mobile) {
      color = props.theme.colors.mainBlue;
    }
    if (props.$isStarted) {
      color = props.theme.colors.mainBlue;
    }
    if (props.$isHidden) {
      color = props.theme.colors.grey93;
    }
    return color;
  }};
  border-radius: 18px;

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}

  @media ${(props) => props.theme.media.mobile} {
    width: 7.5vw;
    height: 7.5vw;
    padding: 1vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: 400;
    font-size: 4.7vw;
    line-height: 1;
    border-radius: 15px;

    ${(props) => {
      if (props.$progress === 100) {
        return css`
          background-image: url(${doneIcon});
          background-color: ${!props.$isHidden && props.theme.colors.mainGreen};
        `;
      }
    }}
  }
`;
