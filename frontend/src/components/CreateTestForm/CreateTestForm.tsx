import { useState } from 'react';
import * as S from './styles';
import { Title } from './Title';
import { Variant } from './Variant';

export function CreateTestForm() {
  const [testName, setTestName] = useState<string>('');

  const handleChangeTestName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTestName(event.target.value);
  };

  return (
    <S.Container>
      <Title value={'Заголовок теста (необязательно)'}/>
      <S.TestName
        type="text"
        value={testName}
        onChange={handleChangeTestName}
      />
      <Variant number={1}/>
    </S.Container>
  );
}
