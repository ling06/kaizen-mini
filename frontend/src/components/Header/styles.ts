import { styled } from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid ${(props) => props.theme.colors.greyF1};
  background-color: ${props => props.theme.colors.realWhite};
  @media ${props => props.theme.media.mobile} {
    padding: 3.125%;
  }
`;
