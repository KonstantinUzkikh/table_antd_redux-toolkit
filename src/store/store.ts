import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tableReducer from '../store/tableSlice';
import formReducer from '../store/formSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  Action<string>
>;
