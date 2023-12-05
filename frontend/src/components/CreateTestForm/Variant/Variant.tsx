import { useEffect, useState } from 'react';
import { Title } from '../Title';
import * as S from './styles';
import { DeleteBtn } from '../DeleteBtn';
import { IAnswer } from '@/shared/model/types/lessonTest.types';
import { CustomRadioButton } from '@/components/CustomRadioButton';
import { useActions } from '@/shared/lib/hooks/useActions';

interface IVariantProps {
  data: IAnswer;
  number: number;
  testId: string;
}

export function Variant({ data, number, testId }: IVariantProps) {
  const { toggleAnswer, changeAnswer, changeAnswerComment, deleteAnswer } = useActions();
  const [isValid, setValid] = useState<boolean>(false);
  const [isChanged, setChanged] = useState<boolean>(false);
  const [defaultCommentValue, setDefaultCommentValue] = useState<string>('');

  useEffect(() => {
    const trueComment = 'Верно, потому что ';
    const falseComment = 'Неверно, потому что ';
    changeAnswerComment({
      testId,
      answerId: data.id || '',
      value: '',
    });
    data.right_answer ? setDefaultCommentValue(trueComment) : setDefaultCommentValue(falseComment);
  }, [changeAnswerComment, data.id, data.right_answer, testId]);

  const handleSetRightAnswer = (isRight: boolean) => {
    const payload = {
      testId,
      answerId: data.id || '',
      isRight: isRight,
    };
    toggleAnswer(payload);
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeAnswer({
      testId,
      answerId: data.id || '',
      value: event.target.value,
    });
    if (event.target.value.length > 0) {
      setValid(true);
    }
    if (!isChanged) {
      setChanged(true);
    }
  };

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (!value.includes(defaultCommentValue)) {
      value = defaultCommentValue + value;
    }
    changeAnswerComment({
      testId,
      answerId: data.id || '',
      value: value,
    });
  };

  const handleDeleteVariant = () => {
    deleteAnswer({
      testId,
      answerId: data.id || '',
    });
  };

  const radioFontStyles = {
    fontSize: '18px',
    fontWeight: '600',
  };

  return (
    <S.Container>
      <Title value={`Вариант ${number}`}>
        {number > 1 && <DeleteBtn onClick={handleDeleteVariant} />}
      </Title>
      <S.VariantInput
        type="text"
        value={data.answer}
        onChange={handleChangeAnswer}
        $isChanged={isChanged}
        $isValid={isValid}
      />
      <S.RadioGroup>
        <CustomRadioButton
          styles={{ marginRight: '25px', color: '#5B8930', ...radioFontStyles }}
          name={data.id}
          value="Верный"
          checked={data.right_answer}
          onChange={() => {
            handleSetRightAnswer(true);
          }}
        />
        <CustomRadioButton
          styles={{ color: '#E03638', ...radioFontStyles }}
          name={data.id}
          value="Неверный"
          checked={!data.right_answer}
          onChange={() => {
            handleSetRightAnswer(false);
          }}
        />
      </S.RadioGroup>
      <S.CommentInput
        type="text"
        value={data.text || defaultCommentValue}
        $isRight={data.right_answer}
        onChange={handleChangeComment}
      />
    </S.Container>
  );
}
