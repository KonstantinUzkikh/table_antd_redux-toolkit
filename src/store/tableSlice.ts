import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as generateKey } from 'uuid';

import { fetchTable, ITableRec, IData } from '../utils';

export interface ITableState {
  status: 'idle' | 'loading' | 'failed';
  table: ITableRec[];
  currentRowId: string;
}

const initialState: ITableState = {
  status: 'idle',
  table: [],
  currentRowId: '',
};

export const loadDataAsync = createAsyncThunk(
  'table/fetchTable',
  async (_, {dispatch}) => {
    const response = await fetchTable();
    return response.data.map(it => ({
      name: it.name,
      vocation: it.vocation,
      date: it.date,
      projects: it.projects,
      id: generateKey(),
    })
    )
  }
);

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    tableReset: (state) => {
      Object.assign(state, initialState);
    },
    addRow: (state, action: PayloadAction<IData>) => {
      state.table = [...[{ ...action.payload, id: generateKey()}], ...state.table];
    },
    editRow: (state, action: PayloadAction<ITableRec>) => {
      const table = [...state.table];
      table.splice(table.findIndex(it => it.id === action.payload.id), 1, { ...action.payload})
      state.table = table;
    },
    delRow: (state, action: PayloadAction<string>) => {
      const table = [...state.table];
      table.splice(table.findIndex(it => it.id === action.payload), 1)
      state.table = table;
    },
    setCurrentRow: (state, action: PayloadAction<string>) => {
      state.currentRowId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadDataAsync.fulfilled, (state, action: PayloadAction<ITableRec[]>) => {
        state.table = [...state.table, ...action.payload];
        state.status = 'idle';
      })
      .addCase(loadDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { tableReset, addRow, editRow, delRow, setCurrentRow } = tableSlice.actions;

export default tableSlice.reducer;
