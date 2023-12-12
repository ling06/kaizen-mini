import * as S from './styles';

interface IUserAvatar {
  image: string;
  onError?: () => void;
}

/**
 * Renders a user avatar component.
 *
 * @param {string} image - The URL of the user's avatar image.
 * @param {Function} onError - A callback function to handle image loading errors.
 * @return {JSX.Element} The rendered user avatar component.
 */
export function UserAvatar({ image, onError }: IUserAvatar): JSX.Element {
  return (
    <S.AvatarWrapper>
      <S.Avatar
        src={image}
        onLoad={onError}
      />
    </S.AvatarWrapper>
  );
}
