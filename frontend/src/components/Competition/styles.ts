import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled.div<{ $isDeleted: boolean; $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0.5)};
  background-color: ${(props) => (props.$isDeleted ? 'rgba(224, 54, 56, .1)' : props.theme.colors.realWhite)};
  transition: opacity 0.2s ease-in-out;
  border-radius: ${props => props.theme.utils.br};
  &:hover {
    opacity: 1;
  }
`;

export const Head = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CompetitionPagination = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 130%;
  color: ${(props) => props.theme.colors.realBlack};
`;

export const CompetitionTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 700;
  line-height: 145.5%;
  color: ${(props) => props.theme.colors.realBlack};
`;

export const CompetitionDescr = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 170%;
  color: ${(props) => props.theme.colors.realBlack};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MoreBtn = styled(C.DefaultBtn)`
  width: fit-content;
  margin: auto auto 0;
  padding: 0 40px;
  border-radius: 22.689px;
`;
