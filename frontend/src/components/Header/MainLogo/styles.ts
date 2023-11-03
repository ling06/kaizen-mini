import { styled } from 'styled-components';

export const MainLogo = styled.img`
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;
