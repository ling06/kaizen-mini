import * as S from './styles';

interface IRoleProps {
  name: string;
  description: string;
  onClick: (name: string, description: string) => void;
}

export function Role({ name, description, onClick }: IRoleProps) {
  return (
    <S.Role onClick={() => onClick(name, description)}>
      <S.RoleName>{name}</S.RoleName>
      <S.RoleDescr>{description}</S.RoleDescr>
    </S.Role>
  );
}
