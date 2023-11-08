import * as S from './styles';

interface IEditorYoutubeFrameProps {
  src: string;
}

export function EditorYoutubeFrame({ src }: IEditorYoutubeFrameProps) {
  return (
    <S.Container>
      <S.YoutubeFrame src={src} id="ytplayer" width={'100%'}/> 
    </S.Container>
  );
}
