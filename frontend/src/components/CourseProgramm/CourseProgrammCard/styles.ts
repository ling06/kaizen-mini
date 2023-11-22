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
  background-color: ${(props) =>
    props.$isDeleted ? props.theme.colors.grey93 : props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
  @media ${(props) => props.theme.media.mobile} {
    width: 49%;
    height: auto;
    min-height: 63.125vw;
    padding: 3.125vw 3.125vw 2.1875vw;
    border-radius: 7.597px;
  }
`;

export const imgWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3/2;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.greyEO};
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 2.5vw;
    border-radius: 7.597px;
  }

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

export const Title = styled(C.Text)`
  line-height: 160%;
  word-break: break-word;
  @media ${(props) => props.theme.media.mobile} {
    font-size: 3.75vw;
  }
`;

export const ProgressContainer = styled(C.FlexContainer)`
  flex-direction: column;
  margin-top: auto;
`;

export const ProgressStatusWrapper = styled(C.FlexContainer)`
  align-items: flex-end;
  margin-bottom: 10px;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 0;
  }
`;

export const ProgressStatus = styled.p`
  margin-right: auto;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.realBlack};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 2.5vw;
  }
`;

export const BtnsGroup = styled(C.FlexContainer)`
  flex-direction: column;
  width: fit-content;
`;
