import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import * as S from './styles';
import { UserAvatar } from '@/shared/ui/components';
import {  useGetMeQuery } from '@/entities/user';

export function ProfileBlock() {
  const token = useTypedSelector((state) => state.user.token);
  const { data, isLoading } = useGetMeQuery(null, { skip: !token });


  return (
    <S.Container>{data?.data && !isLoading && <UserAvatar userData={data.data} />}</S.Container>
  );
}
