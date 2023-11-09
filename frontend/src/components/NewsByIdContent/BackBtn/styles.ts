import styled from 'styled-components';
import * as C from '@styles/components';
import backIcon from '@assets/images/arrow-left-blue.svg';

export const Button = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: transparent;
  padding: 0;
  margin: 0;
  margin-bottom: 18px;
`;

export const Icon = styled(C.Icon)`
  margin-right: 8px;
  background-image: url(${backIcon});
`;

export const Text = styled.span`
  font-size: 22px;
  font-weight: 500;
  line-height: 149.5%;
  color: ${(props) => props.theme.colors.mainBlue};
`;
