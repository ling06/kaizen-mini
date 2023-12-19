import { useGetPermissionsQuery } from '@/entities/permissions';
import { ViewBlock } from '../ViewBlock';
import * as S from './styles';
import { TExtendedUser } from '@/entities/users';
import { ErrorBlock } from '@/components/ErrorBlock';
import { PermissionsBlock } from '../PermissionsBlock';

interface IUserPermissionsProps {
  userPermissions: TExtendedUser['data']['permissions'] | undefined;
}

export function UserPermissions({ userPermissions }: Readonly<IUserPermissionsProps>) {
  const { data, isError } = useGetPermissionsQuery(null);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const formData = Object.fromEntries(data.entries());
    const permissions = Object.keys(formData).map((key) => ({ code: key }));
    const json = JSON.stringify(permissions);
    console.log(json);
  };

  if (!data && isError) {
    return <ErrorBlock />;
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      {data && userPermissions && (
        <>
          <ViewBlock
            viewPermissions={data.data.view}
            userViewPermissions={userPermissions}
          />
          <PermissionsBlock
            permissions={data.data.create}
            userPermissions={userPermissions}
          />
          <PermissionsBlock
            permissions={data.data.sort}
            userPermissions={userPermissions}
          />
          <PermissionsBlock
            permissions={data.data.edit}
            userPermissions={userPermissions}
          />
          <PermissionsBlock
            permissions={data.data.soft_delete}
            userPermissions={userPermissions}
          />
          <PermissionsBlock
            permissions={data.data.force_delete}
            userPermissions={userPermissions}
          />
          <PermissionsBlock
            permissions={data.data.restore}
            userPermissions={userPermissions}
          />
        </>
      )}
      <button>Сохранить</button>
    </S.Form>
  );
}
