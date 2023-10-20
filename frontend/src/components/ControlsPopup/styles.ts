import styled from 'styled-components';
import * as C from '@styles/components';
import { TextStyles } from '@/styles/base-styles';
import hideIcon from '@assets/images/hideIcon.svg';
import addIcon from '@assets/images/addIconBlack.svg';
import editIcon from '@assets/images/editIconRed.svg';
import deleteIcon from '@assets/images/deleteIcon.svg';
import visibleIcon from '@assets/images/visibleIcon.svg';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  z-index: ${props => props.theme.utils.zIndex.popup};
  padding: 15px 10px 10px;
  width: 320px;
  /* min-height: 316px; */
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.greyF1};
  filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.25));
`;

export const Title = styled(C.Text)`
  margin-bottom: 15px;
  text-align: center;
`;

export const Btn = styled.div`
  ${TextStyles}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: ${props => props.theme.utils.br};
  background-color: ${props => props.theme.colors.realWhite};
  transition: ${props => props.theme.utils.transition};

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  &:hover {
    background-color: ${props => props.theme.colors.greyF1};
  }
`;

export const HideBtn = styled(Btn)``;

export const VisibleBtn = styled(Btn)``;

export const AddBtn = styled(Btn)``;

export const EditBtn = styled(Btn)``;

export const DeleteBtn = styled(Btn)`
  color: ${props => props.theme.colors.yRed};
`;

export const RestoreBtn = styled(Btn)``;

export const BtnIcon = styled(C.Icon)`
  margin-right: 15px;
`;

export const HideIcon = styled(BtnIcon)`
  background-image: url(${hideIcon});
`;

export const AddIcon = styled(BtnIcon)`
  background-image: url(${addIcon});
`;

export const EditIcon = styled(BtnIcon)`
  background-image: url(${editIcon});
`;

export const DeleteIcon = styled(BtnIcon)`
  background-image: url(${deleteIcon});
`;

export const VisibleIcon = styled(BtnIcon)`
  background-image: url(${visibleIcon});
`;
