import { configureStore } from '@reduxjs/toolkit';
import type {State, AppDispatch} from '../types/state';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { createAPI } from '../services/api';
import redirect from '../store/middleware/redirect';
import { rootReducer } from '../store/root-reducer';


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect),
});
