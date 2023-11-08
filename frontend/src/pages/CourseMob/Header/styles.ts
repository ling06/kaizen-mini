import styled from 'styled-components';
import bookIcon from '@assets/images/book.svg';
import * as C from '../../../styles/components';
import homeIcon from '@assets/images/home.svg';

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 3.125vw;
  border-bottom: 1px solid ${(props) => props.theme.colors.greyF1};
  background-color: ${props => props.theme.colors.realWhite};
`;

export const OpenNavBtn = styled(C.Icon)`
  padding: 0;
  margin: 0;
  margin-right: auto;
  background-image: url(${bookIcon});
  background-color: transparent;
`;

export const HomeLink = styled(C.Icon)`
  background-image: url(${homeIcon});
`; 
