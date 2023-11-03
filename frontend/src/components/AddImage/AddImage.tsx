import { IUploadedImage } from '@/types/image.types';
import { CustomFileInput } from '../CustomFileInput';
import { Image } from './Image';
import * as S from './styles';

interface IAddImageProps {
  name: string;
  onSet: (base64: string, extension: string) => void;
  imageData: IUploadedImage | null;
  onDelete: () => void;
}

/**
 * Renders an image upload component with controls.
 *
 * @param {IAddImageProps} props - The props object containing the following properties:
 *   - name: The name of the add image button.
 *   - onSet: A function to handle setting the image data.
 *   - imageData: The data of the image to be displayed.
 *   - onDelete: A function to handle deleting the image data.
 * @return {JSX.Element} The rendered image upload component.
 */
export function AddImage({ name, onSet, imageData, onDelete }: IAddImageProps): JSX.Element {
  return (
    <S.Container>
      {imageData && (
        <S.ImageWrapper>
          <Image image={imageData.data} />
        </S.ImageWrapper>
      )}
      <S.ControlsGroup>
        <CustomFileInput onSet={onSet}>
          {!imageData && (
            <S.AddFileBtn>
              <S.AddFileIcon />
              {name}
            </S.AddFileBtn>
          )}
          {imageData && (
            <S.EditFileBtn>
              <S.EditIcon />
              изменить
            </S.EditFileBtn>
          )}
        </CustomFileInput>
        {imageData && (
          <S.DeleteFileBtn onClick={onDelete}>
            <S.DeleteIcon />
            Удалить
          </S.DeleteFileBtn>
        )}
      </S.ControlsGroup>
    </S.Container>
  );
}
