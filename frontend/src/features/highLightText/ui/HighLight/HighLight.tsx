import * as S from './styles';

interface IHighLightProps {
  filter: string;
  str: string;
  color?: string;
}

export function HighLight({ filter, str, color }: IHighLightProps) {
  if (!filter) return str;
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return (
          <>
            {s}
            <S.HighLightText $color={color}>{c}</S.HighLightText>
          </>
        );
      }
      return s;
    });
  }
  return str;
}
