import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 65px;
`;

export const Title = styled(C.Text)`
  margin-bottom: 15px;
  font-weight: 600;
`;

export const SetBtn = styled(C.DefaultBtn)`
   width: fit-content;
   padding: 0 25px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;
