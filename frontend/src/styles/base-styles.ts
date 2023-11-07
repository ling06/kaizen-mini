import { css } from 'styled-components';

export const TextStyles = css`
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realBlack};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 5.625vw;
  }
`;
