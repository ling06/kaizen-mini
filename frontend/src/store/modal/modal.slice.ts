import { ModalPosition } from '@/shared/model/types/common.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IModalInitialState {
  isModalOpen: boolean;
  modalType: string;
  modalPosition: ModalPosition;
}

const ModalInitialState: IModalInitialState = {
  isModalOpen: false,
  modalType: '',
  modalPosition: ModalPosition.right,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: ModalInitialState,
  reducers: {
    setModalOpen: (state, { payload }) => {
      console.log('payload', payload);

      if (payload) {
        state.isModalOpen = payload;
        document.body.style.overflow = 'hidden';
        return;
      }

      document.body.style.overflow = 'unset';
      return ModalInitialState;
    },
    setModalType: (state, { payload }) => {
      state.modalType = payload;
    },
    setModalPosition: (state, { payload }: PayloadAction<ModalPosition>) => {
      state.modalPosition = payload;
    },
  },
});

export const { actions, reducer } = modalSlice;
