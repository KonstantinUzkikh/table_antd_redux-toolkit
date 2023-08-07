import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITableRec, initialFieldsValues } from '../utils';
import { AppDispatch, AppThunk } from './store';

export interface IFormState {
  isOpen: boolean;
  fields: ITableRec;
}

const initialState: IFormState = {
  isOpen: false,
  fields: initialFieldsValues,
};

export const loadFormData = (rec: ITableRec): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loadData(rec));
  dispatch(openForm());
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    loadData: (state, action: PayloadAction<ITableRec>) => {
      state.fields = {
        id: action.payload.id,
        name: action.payload.name,
        vocation: action.payload.vocation,
        date: action.payload.date,
        projects: action.payload.projects,
      }
    },
    openForm: (state) => {
      state.isOpen = true
    },
    closeForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { openForm, closeForm, loadData } = formSlice.actions;

export default formSlice.reducer;
