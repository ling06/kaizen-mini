import * as S from './styles';
import { UserAvatar } from '@/shared/ui/components';
import {  useGetMeQuery } from '@/entities/user';

export function ProfileBlock() {
  const { data, isLoading } = useGetMeQuery(null);

  return (
    <S.Container>{data?.data && !isLoading && <UserAvatar userData={data.data} />}</S.Container>
  );
}
