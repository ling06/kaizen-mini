import { useEffect, useState } from 'react';
import * as S from './styles';
import { IImage, IUploadedImage } from '@/shared/types/image.types';

interface IImageProps {
  image: IUploadedImage | IImage;
  description?: string;
  styles?: { [key: string]: string };
}
export function Image({ image, description, styles={} }: IImageProps) {
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
    <S.ImageWrapper style={styles}>
      <S.Image
        src={src}
        alt={description}
      />
    </S.ImageWrapper>
  );
}
