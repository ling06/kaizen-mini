import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  width: 100%;
  height: 100%;
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
`;

export const MoreBtn = styled(C.DefaultBtn)`
  width: fit-content;
  margin: auto auto 0;
  padding: 0 40px;
  border-radius: 22.689px;
`;
