import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Films } from '../types/films';
import { UserData } from '../types/user-data';

export const changeGenre = createAction('film/changegenre', (genre) => ({
  payload: genre
}));

export const setFilmsByGenre = createAction('film/setFilmsBygenre');

export const showMore = createAction('film/showMode');

export const resetFilmCount = createAction('film/resetFilmCount');

export const setFilms = createAction<Films>('api/setFilms');

export const setUserData = createAction<UserData>('api/setUserData');

export const setDataLoadedStatus = createAction<boolean>('api/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorisation');

export const redirectToRoute = createAction<AppRoute>('browser/redirectToRoute');
