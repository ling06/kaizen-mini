import { IImage, IUploadedImage } from '@/shared/types/image.types';
import { CustomFileInput } from '../CustomFileInput';
import { Image } from './Image';
import * as S from './styles';

interface IAddImageProps {
  name: string;
  onSet: (base64: string, extension: string) => void;
  imageData: IUploadedImage | IImage | null;
  onDelete: () => void;
  previewImageStyles?: { [key: string]: string };
}

/**
 * Renders an image upload component with controls.
 *
 * @param {IAddImageProps} props - The props object containing the following properties:
 *   - name: The name of the add image button.
 *   - onSet: A function to handle setting the image data.
 *   - imageData: The data of the image to be displayed.
 *   - onDelete: A function to handle deleting the image data.
 *   - previewImageStyles: An object containing styles for the preview image.
 * @return {JSX.Element} The rendered image upload component.
 */
export function AddImage({ name, onSet, imageData, onDelete, previewImageStyles={} }: IAddImageProps): JSX.Element {
  return (
    <S.Container>
      {imageData && <Image image={imageData} styles={previewImageStyles}/>}
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
