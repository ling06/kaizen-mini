import styled from 'styled-components';
import * as C from '@styles/components';

interface ICard {
  $isDeleted: boolean;
}

export const Card = styled(C.FlexContainer)<ICard>`
  flex-direction: column;
  width: 310px;
  height: 400px;
  padding: 20px;
  padding-bottom: 15px;
  background-color: ${(props) => props.$isDeleted ? props.theme.colors.grey93 : props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
`;

export const imgWrapper = styled.div`
  width: 100%;
  height: 180px;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: ${props => props.theme.utils.br};
  background-color: ${props => props.theme.colors.greyEO};
  cursor: pointer;
  transition: transform .3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Title = styled(C.Text)``;

export const ProgressContainer = styled(C.FlexContainer)`
  flex-direction: column;
  margin-top: auto;
`;

export const ProgressStatusWrapper = styled(C.FlexContainer)`
  align-items: center;
  margin-bottom: 10px;
`;

export const ProgressStatus = styled.p`
  margin-right: auto;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.realBlack};
`;

