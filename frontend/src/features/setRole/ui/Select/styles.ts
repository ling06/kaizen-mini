import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import arrow from '@assets/images/accordionIcon.svg';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const OpenBtn = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 60px;
  padding: 0 15px 0 25px;
  border: 2px solid ${(props) => props.theme.colors.realBlack};
  border-radius: ${(props) => props.theme.utils.br};
  background-color: transparent;
`;

export const SelectedValue = styled(C.Text)`
  margin-right: 13px;
`;

export const Arrow = styled(C.Icon)`
  background-image: url(${arrow});
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Options = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 560px;
  max-height: 490px;
  background-color: white;
  border: 2px solid ${props => props.theme.colors.realBlack};
  border-radius: ${props => props.theme.utils.br};
  overflow-y: auto;
`;

export const Option = styled.li`
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  cursor: pointer;

  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.greyF1};
  }
`;

export const OptionValue = styled(C.Text)`
  margin-bottom: 5px;
`;

export const OptionDescription = styled(C.Text)`
  font-weight: 400;
`;
