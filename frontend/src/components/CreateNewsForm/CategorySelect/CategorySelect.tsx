import { INewsCategory } from '@/types/news.types';
import * as S from './styles';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/constants';

interface ICategorySelectProps {
  onClose: () => void;
  categories: Array<INewsCategory>;
  onAdd: () => void;
  onChange: () => void;
}

export function CategorySelect({ onClose, categories, onAdd, onChange }: ICategorySelectProps) {
  const isMobile = useMediaQuery(MediaQueries.mobile);
  return (
    <S.MainContainer>
      <S.Overlay onClick={onClose}/>
      <S.Container>
        <S.BtnsGroup>
          <S.Categories>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <S.Category
                  key={category.id}
                  onClick={() => {
                    onChange();
                    onClose();
                  }}>
                  <S.CategoryName>{category.title}</S.CategoryName>
                </S.Category>
              ))}
          </S.Categories>
          <S.AddBtn onClick={() => {
            onAdd();
            onClose();
          }}>
            <S.addIcon />
            {isMobile ? 'Добавить' : 'добавить категорию'}
          </S.AddBtn>
        </S.BtnsGroup>
      </S.Container>
    </S.MainContainer>
  );
}
