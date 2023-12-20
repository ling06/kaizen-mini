import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import saveIcon from '@assets/images/Save.svg';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding-top: 12px;
`;

export const Divider = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  max-width: 1266px;
  height: 1px;
  background-color: ${(props) => props.theme.colors.greyF1};
  transform: translateX(-50%);
`;

export const SaveIcon = styled(C.Icon)`
  margin-right: 5px;
  background-image: url(${saveIcon});
`;
