import * as S from './styles';

interface ICustomFileInputProps {
  onSet: (base64: string, extension: string) => void;
  children: React.ReactNode;
}

/**
 * Renders a custom file input component.
 *
 * @param {ICustomFileInputProps} onSet - A function that is called when a file is selected and converted to base64.
 * @param {React.ReactNode} children - The children elements to be rendered inside the component.
 */
export function CustomFileInput({ onSet, children }: ICustomFileInputProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileExtension = file.name.split('.').pop() || null;
      if (fileExtension) {
        convertToBase64(file, fileExtension);
      }
    }
  };

  const convertToBase64 = (file: File, extension: string) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      onSet(base64, extension);
    };
    reader.readAsDataURL(file);
  };

  return (
    <S.InputWrapper>
      <S.FileInput
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {children}
    </S.InputWrapper>
  );
}
