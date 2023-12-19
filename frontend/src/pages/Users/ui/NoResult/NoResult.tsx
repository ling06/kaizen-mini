import * as S from './styles';

interface INoResultProps {
  value: string;
}

export function NoResult({value}: Readonly<INoResultProps>) {
  return (
    <S.NoResult>
      Нет результатов по запросу "{value}"
    </S.NoResult>
  );
}
