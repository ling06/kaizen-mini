import * as S from './styles';
import { UserAvatar } from '@/shared/ui/components';
import {  useGetMeQuery } from '@/entities/auth';

export function ProfileBlock() {
  const { data, isLoading } = useGetMeQuery(null);
  console.log(data);
  

  return (
    <S.Container>{data?.data && !isLoading && <UserAvatar userData={data.data} />}</S.Container>
  );
}
