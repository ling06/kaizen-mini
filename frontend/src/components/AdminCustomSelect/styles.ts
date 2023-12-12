import styled from "styled-components";
import * as C from "@styles/components";
import Loupe from "@assets/images/loupe-black.svg";
import CrossWhite from "@assets/images/cross-white.svg";

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
`;

export const Label = styled(C.AdminTitle)`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ListSelectedItems = styled(C.FlexContainer)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px 10px;
  margin-bottom: 20px;
`;

export const SelectedItem = styled(C.FlexContainer)`
  min-width: 190px;
  width: auto;
  height: 40px;
  padding: 0 10px 0 20px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.dark};
  border-radius: ${(props) => props.theme.utils.br};
`;

export const SelectedItemText = styled(C.AdminText)`
  font-size: 15px;
  font-weight: 600;
  margin-right: 5px;

  color: ${(props) => props.theme.colors.realWhite};
`;

export const SelectedItemIcon = styled(C.Icon)`
  background-image: url(${CrossWhite});

  &:hover {
   cursor: pointer;
  }
`;

export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.grey93};
  background-color: ${(props) => props.theme.colors.greyF1};
  padding: 21px 0 21px 30px;

  color: ${(props) => props.theme.colors.grey93};
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  border-radius: ${(props) => props.theme.utils.br};
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.realBlack};
    background-color: ${(props) => props.theme.colors.realWhite};
    border-bottom: none;
    border-radius: 15px 15px 0 0;
  }
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const IconInput = styled(C.Icon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-image: url(${Loupe});
`;

export const List = styled.ul`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 222;
  padding: 0;
  border-radius: 0 0 15px 15px;
  border: 2px solid ${(props) => props.theme.colors.realBlack};
  border-top: none;
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const ListItem = styled.li`
  width: 100%;
  height: 55px;
  padding: 15px 0 16px 25px;

  color: ${(props) => props.theme.colors.dark};
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.greyF1};
  }
  &:last-child {
    &:hover {
      border-radius: 0 0 15px 15px;
    }
  }
`;
