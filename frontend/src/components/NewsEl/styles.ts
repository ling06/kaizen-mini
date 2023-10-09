import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  padding: 20px 15px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const Title = styled.h3`
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 700;
  line-height: 149.5%;
  color: ${(props) => props.theme.colors.mainBlue};
`;

export const Image = styled.img`
  display: block;
  margin-bottom: 20px;
`;

export const Footer = styled(C.FlexContainer)`
  align-items: center;
`;

export const MoreBtn = styled(C.DefaultBtn)`
  min-height: 44px;
  padding: 0 20%;
`;

export const Date = styled.p`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 149.5%;
  color: ${(props) => props.theme.colors.grey93};
`;

export const Author = styled(Date)``;
