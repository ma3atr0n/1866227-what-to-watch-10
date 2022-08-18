import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { filmData } from './film-data/film-data';
import { reviewData } from './review-data/review-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.FilmData]: filmData.reducer,
  [NameSpace.ReviewData]: reviewData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
