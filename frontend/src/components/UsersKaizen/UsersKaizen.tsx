import { UserAvatar } from "../UserAvatar";
import * as S from "./styles";

interface IUsersKaizenProps {
  img: string;
  name: string;
}

export function UsersKaizen({ img, name }: IUsersKaizenProps) {
  return (
    <>
      <S.UserContainer>
        <UserAvatar image={img} />
        <S.UserName>{name}</S.UserName>
      </S.UserContainer>
    </>
  );
}
