import styled from 'styled-components';
import * as C from '@styles/components';
import imagesIcon from '@assets/images/imagesIcon.svg';
import editIcon from '@assets/images/editIcon-with-pen.svg';
import deleteIcon from '@assets/images/deleteIcon-white.svg';

export const Container = styled.div``;

export const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

export const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AddFileBtn = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  width: fit-content;
  min-height: 41px;
  padding: 0 23px 0 17px;
  font-size: 15.397px;
`;

export const EditFileBtn = styled(AddFileBtn)`
  min-height: 60px;
  padding: 0 30px;
  font-size: 15px;
`;

export const DeleteFileBtn = styled(EditFileBtn)`
  padding: 0 33px 0 23px;
  background-color: ${(props) => props.theme.colors.yRed};

  &:hover {
    background-color: ${(props) => props.theme.colors.darkRed};
  }
`;

export const AddFileIcon = styled(C.Icon)`
  margin-right: 11px;
  background-image: url(${imagesIcon});
`;

export const EditIcon = styled(C.Icon)`
  margin-right: 8px;
  background-image: url(${editIcon});
`;

export const DeleteIcon = styled(C.Icon)`
  margin-right: 8px;
  background-image: url(${deleteIcon});
`;
