import styled from "styled-components";
import * as C from "@styles/components";
import saveIcon from "@assets/images/Save.svg";
import deleteIcon from "@assets/images/deleteIcon.svg";

export const Container = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled(C.InputWithState)`
  max-width: 80%;
`;

export const SaveBtn = styled(C.Icon)`
  padding: 0;
  background-color: transparent;
  background-image: url(${saveIcon});
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.3s ease linear;
  }
`;

export const DeleteBtn = styled(SaveBtn)`
  background-image: url(${deleteIcon});
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.3s ease linear;
  }
`;
