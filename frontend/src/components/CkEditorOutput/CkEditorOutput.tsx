import * as S from './styles';

interface ICkEditorOutputProps {
    data: string;
}

export function CkEditorOutput({data}: ICkEditorOutputProps){

    return(
        <>
            {data && (
                <S.Container dangerouslySetInnerHTML={{ __html: data }} className='ck-content'>
                </S.Container>
            )}
        </>);
};