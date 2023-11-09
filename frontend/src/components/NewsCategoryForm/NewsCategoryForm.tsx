import { ModalForm } from '../ModalForm';
import * as S from './styles';

export function NewsCategoryForm() {


  const handlers = {
    cancel: ()=>{},
    confirm: ()=>{},
  }

  const names ={
    cancel: "Отмена",
    confirm: "Сохранить",
  }

  return (
    <ModalForm
      width='510px'
      handlers={handlers}
      names={names}
    >
      
    </ModalForm>
  );
}
