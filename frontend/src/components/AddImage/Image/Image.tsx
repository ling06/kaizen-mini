import * as S from './styles';

interface IImageProps {
  image: string;
  description?: string;
}
export function Image({ image, description }: IImageProps) {
  return (
    <S.ImageWrapper>
      <S.Image
        src={image}
        alt={description}
      />
    </S.ImageWrapper>
  );
}
