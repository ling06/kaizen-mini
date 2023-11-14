import * as S from './styles';
import { useParams } from 'react-router-dom';
import {  useGetLessonByIdQuery } from '@/store/api/lesson.api';

export function CkEditorOutput(){
    const { lessonId } = useParams();
    const { data } = useGetLessonByIdQuery(String(lessonId), {
        skip: !lessonId,
    });
    
    return(
        <>
            {lessonId && data && (
                <S.Container dangerouslySetInnerHTML={{ __html: data.data.description }} className='ck-content'>
                </S.Container>
            )}
        </>);
};