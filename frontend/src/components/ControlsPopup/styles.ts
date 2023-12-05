import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import { TextStyles } from '@/shared/ui/assets/styles/base-styles';
import hideIcon from '@assets/images/hideIcon.svg';
import addIcon from '@assets/images/addIconBlack.svg';
import editIcon from '@assets/images/editIconRed.svg';
import deleteIcon from '@assets/images/deleteIcon.svg';
import visibleIcon from '@assets/images/visibleIcon.svg';

export const Overlay = styled(C.DarkOverlay)`
    z-index: ${(props) => props.theme.utils.zIndex.popup};
  @media ${(props) => props.theme.media.desktop} {
    background-color: transparent;
    position: absolute;
    top: 100%;
    right: 0;
    left: unset;
    width: 320px;
    filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.25));
  }
`;

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  width: 100%;
  padding: 15px 10px 10px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.greyF1};
  @media ${(props) => props.theme.media.mobile} {
    padding: 3.125vw;
    border-radius: 0px 0px 15px 15px;
  }
`;

export const Title = styled(C.Text)`
  margin-bottom: 15px;
  text-align: center;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 4.6875vw;
  }
`;

export const Btn = styled.div`
  ${TextStyles}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
  transition: ${(props) => props.theme.utils.transition};
  @media ${(props) => props.theme.media.mobile} {
    min-height: 18.75vw;
  }

  &:not(:last-child) {
    margin-bottom: 5px;
    @media ${(props) => props.theme.media.mobile} {
      margin-bottom: 1.5625vw;
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.greyF1};
  }
`;

export const HideBtn = styled(Btn)``;

export const VisibleBtn = styled(Btn)``;

export const AddBtn = styled(Btn)``;

export const EditBtn = styled(Btn)``;

export const DeleteBtn = styled(Btn)`
  color: ${(props) => props.theme.colors.yRed};
`;

export const RestoreBtn = styled(Btn)``;

export const BtnIcon = styled(C.Icon)`
  margin-right: 15px;
  @media ${(props) => props.theme.media.mobile} {
    margin-right: 3.125vw;
  }
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
