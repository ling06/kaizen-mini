import styled from "styled-components";
import * as C from "@styles/components";

export const UserContainer = styled(C.FlexContainer)`
  flex-direction: row;
  align-items: center;
  max-width: 385px;
  column-gap: 20px;
  height: 45px;
  :hover {
      cursor: pointer;
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  overflow: hidden;
  border-radius: 50%;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


export const UserName = styled(C.AdminText)`
`