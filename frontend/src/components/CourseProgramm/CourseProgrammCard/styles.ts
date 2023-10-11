import styled from 'styled-components';
import * as C from '@styles/components';

export const Card = styled(C.FlexContainer)`
  flex-direction: column;
  width: 310px;
  height: 400px;
  padding: 20px;
  padding-bottom: 15px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
`;

export const imgWrapper = styled.div`
  width: 100%;
  height: 180px;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: ${props => props.theme.utils.br};
  background-color: ${props => props.theme.colors.greyEO};
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

