import { useState } from 'react';
import * as S from './styles';
import { Title } from './Title';
import { Variant } from './Variant';



export function CreateTestForm() {
  const [testName, setTestName] = useState<string>('');
  const [isChanged, setChanged] = useState<boolean>(false);
  const [testVariantsData, setTestVariantsData] = useState();

  const handleChangeTestName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTestName(event.target.value);
    if (!isChanged) {
      setChanged(true);
    }
  };

  return (
    <S.Container>
      <Title value={'Заголовок теста (необязательно)'} />
      <S.TestName
        type="text"
        value={testName}
        onChange={handleChangeTestName}
        $isValid={true}
        $isChanged={isChanged}
      />
      <S.Variants>

      </S.Variants>
    </S.Container>
  );
}
