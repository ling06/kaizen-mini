import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  row-gap: 18px;
  margin-bottom: 40px;
`;

export const TitleWrapper = styled(C.FlexContainer)`
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(C.Text)`
  font-size: 25px;
`;

export const ProgressBar = styled(C.ProgressBar)`
  height: 10px;
`;
