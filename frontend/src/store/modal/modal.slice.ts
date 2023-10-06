import { createSlice } from '@reduxjs/toolkit';

export interface IModalInitialState {
  isModalOpen: boolean;
  modalType: string;
}

const ModalInitialState: IModalInitialState = {
  isModalOpen: false,
  modalType: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: ModalInitialState,
  reducers: {
    setModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
      payload
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'unset');
    },
    setModalType: (state, { payload }) => {
      state.modalType = payload;
    },
  },
});

export const { actions, reducer } = modalSlice;
