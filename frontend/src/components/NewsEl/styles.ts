import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled.div<{ $isDeleted: boolean; $isVisible: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px 15px;
  border-radius: ${(props) => props.theme.utils.br};
  opacity: ${(props) => (props.$isVisible ? 1 : 0.5)};
  background-color: ${(props) => (props.$isDeleted ? 'rgba(224, 54, 56, .1)' : props.theme.colors.realWhite)};
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
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
  border-radius: ${(props) => props.theme.utils.br};
  width: 920px;
  height: 920px;
  object-fit: cover;
`;

export const Footer = styled(C.FlexContainer)`
  align-items: center;
  margin-top: 18px;
`;

export const MoreBtn = styled(C.DefaultBtn)`
  min-height: 44px;
  padding: 0 20%;
`;

export const ImageContainer = styled.div`
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: ${(props) => props.theme.utils.br};
`;
