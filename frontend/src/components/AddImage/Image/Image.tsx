import { useEffect, useState } from 'react';
import * as S from './styles';
import { IImage, IUploadedImage } from '@/types/image.types';

interface IImageProps {
  image: IUploadedImage | IImage;
  description?: string;
}
export function Image({ image, description }: IImageProps) {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    if('id' in image) {
      const src = image.directory + '/' + image.name;
      setSrc(src);
      return;
    }
    if(image.data) [
      setSrc(image.data)
    ]
  }, [image])

  return (
    <S.ImageWrapper>
      <S.Image
        src={src}
        alt={description}
      />
    </S.ImageWrapper>
  );
}
