import { useState } from 'react';
import * as S from './styles';
import { TRole } from '@/entities/role';

interface ISelectProps {
  selectedValue: TRole;
  options: Array<TRole>;
  initialRoleId?: number;
  onSelect: (option: TRole) => void;
}

export function Select({ selectedValue, options, onSelect, initialRoleId }: Readonly<ISelectProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (option: TRole) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <S.Container>
      <S.OpenBtn onClick={handleOpen}>
        <S.SelectedValue>{selectedValue?.name || 'Выберите значение'}</S.SelectedValue>
        <S.Arrow />
      </S.OpenBtn>
      {isOpen && (
        <>
          <S.Overlay onClick={handleClose} />
          <S.Options>
            {options.map((option) => (
              <S.Option
                $isInitial={option.id === initialRoleId}
                key={option.id}
                onClick={() => {
                  handleSelect(option);
                }}>
                <S.OptionValue>{option.name}</S.OptionValue>
                <S.OptionDescription>{option.description}</S.OptionDescription>
              </S.Option>
            ))}
          </S.Options>
        </>
      )}
    </S.Container>
  );
}
