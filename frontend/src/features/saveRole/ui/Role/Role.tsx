import * as S from './styles';

interface IRoleProps {
  name: string;
  description: string;
}

export function Role({ name, description }: IRoleProps) {
  return (
    <S.Role>
      <S.RoleName>{name}</S.RoleName>
      <S.RoleDescr>{description}</S.RoleDescr>
    </S.Role>
  );
}
