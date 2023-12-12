import { useEffect, useRef, useState } from "react";
import * as S from "./styles";

interface IOption {
  id: number;
  name: string;
}

interface IProps {
  data: IOption[];
  placeholder: string;
  multiple: boolean;
  label?: string;
  styles: {
    width: string;
    height: string;
  };
  onClick?: () => void;
}
export function AdminCustomSelect({
  data,
  placeholder,
  label,
  multiple,
  styles,
  onClick,
}: IProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveOption, setActiveOption] = useState<IOption[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", closeDropdown, true);
    return () => {
      document.removeEventListener("click", closeDropdown, true);
    };
  }, []);

  function closeDropdown(e: any) {
    if (e.keyCode === 27) {
      setIsOpen(false);
    } else if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredOptions = data.filter((option: IOption) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // TODO: передать обработчик при multiple(true) чтоб данные помещались в state для упрощения доступа к выбранным значениям
  // TODO: добавить props и вынести функцию из компонента
  const handleOptionClick = (dataOption: IOption) => {
    if (!multiple) {
      setIsOpen(false);
    } else {
      setActiveOption((isActiveOption) => [...isActiveOption, dataOption]);
    }
  };

  const handleOptionDelete = (dataOption: IOption) => {
    const optionDelete = isActiveOption.filter((option: IOption) => {
      if (option.id === dataOption.id) {
        return false;
      }
      return true;
    });

    setActiveOption(optionDelete);
  };

  return (
    <S.Container ref={ref} style={{ width: `${styles.width}` }}>
      <S.Label>{label}</S.Label>
      <S.ListSelectedItems>
        {isActiveOption.length > 0 &&
          isActiveOption.map((option: IOption) => (
            <S.SelectedItem key={option.id}>
              <S.SelectedItemText>{option.name}</S.SelectedItemText>
              <S.SelectedItemIcon
                onClick={() => {
                  handleOptionDelete(option);
                }}
              />
            </S.SelectedItem>
          ))}
      </S.ListSelectedItems>
      <S.InputContainer>
        <S.Input
          style={{ width: `${styles.width}`, height: `${styles.height}` }}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleInputFocus}
        />
        <S.IconInput />
      </S.InputContainer>
      {isOpen && (
        <S.List>
          {filteredOptions.map((option: IOption) => (
            <S.ListItem
              key={option.id}
              // onClick={() => onClick(option)}
            >
              {option.name}
            </S.ListItem>
          ))}
        </S.List>
      )}
    </S.Container>
  );
}
