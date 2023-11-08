import styled from 'styled-components';
import closeIcon from '@assets/images/closeIcon.svg';

export const Button = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  background-image: url(${closeIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: transparent;
  @media ${(props) => props.theme.media.mobile} {
    width: 7.5vw;
    height: 7.5vw;
  }
`;
