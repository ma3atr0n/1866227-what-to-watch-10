import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../store/reducer';
import type {State, AppDispatch} from '../types/state';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { createAPI } from '../services/api';
import redirect from '../store/middleware/redirect';


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect),
});
